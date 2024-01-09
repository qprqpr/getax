<script lang="ts">
  import { format, getMonth, getYear } from "date-fns";
  import { IconTrash } from "@tabler/icons-svelte";

  import { css } from "styled-system/css";
  import { button, input, table } from "styled-system/recipes";
  import {
    stack,
    container,
    hstack,
    grid,
    divider,
  } from "styled-system/patterns";

  import type {
    Income,
    IncomeExt,
    IncomeInsert,
    ExchangeRate,
    CurrencyCode,
  } from "../types";
  import { CURRENCIES, MONTHS } from "../types";

  import Amount from "./Amount.svelte";
  import Field from "./Field.svelte";
  import User from "./User.svelte";
  import { toast } from "../libs";

  export let data;

  type IncomeForm = {
    date: string;
    income: string;
    currency: CurrencyCode;
  };

  type LoginForm = {
    email: string;
  };

  $: ({ supabase, session } = data);

  $: if (session) {
    loadRecords();
  }

  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);

  const settlementMonth = currentMonth > 0 ? currentMonth - 1 : 11;
  const settlementYear = currentMonth > 0 ? currentYear : currentYear - 1;

  const getMonthsTillPresent = (year: number) => {
    return year === currentYear ? MONTHS.slice(0, currentMonth + 1) : MONTHS;
  };

  let loading = false;

  const incomeForm: IncomeForm = {
    date: today,
    income: "",
    currency: "EUR",
  };

  const loginForm: LoginForm = {
    email: "",
  };

  const signIn = async () => {
    if (loginForm.email) {
      await supabase.auth.signInWithOtp({
        email: loginForm.email,
        options: {
          emailRedirectTo: `${location.origin}/auth`,
        },
      });
      toast("Check your email for a link");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast("You have successfully been logged out");
  };

  const getExchangeRate = async (date: string): Promise<ExchangeRate[]> => {
    const res = await fetch(
      `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/?date=${date}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  let yearSum = 0;
  let monthSum = 0;
  let incomes: Record<number, Record<number, IncomeExt[]>> = {};
  let incomeYears = new Set<number>();

  const loadRecords = async () => {
    const { data } = await supabase.from("records").select<"*", Income>();

    if (data) {
      const records: IncomeExt[] = data.map(({ date, ...income }) => ({
        ...income,
        date: new Date(date).getTime(),
      }));

      records.sort((a, b) => a.date - b.date);

      incomes = {};
      incomeYears = new Set([currentYear]);
      yearSum = 0;
      monthSum = 0;

      for (const income of records) {
        const year = getYear(income.date);
        const month = getMonth(income.date);

        if (!incomes[year]) {
          incomes[year] = {};
        }

        if (!incomes[year][month]) {
          incomes[year][month] = [];
        }

        if (year === settlementYear) {
          yearSum += income.amount;
        }

        // We always calculate income sum for previous month
        if (month === settlementMonth) {
          monthSum += income.amount;
        }

        incomes[year][month].push(income);
        incomeYears.add(year);
      }
    }
  };

  const deleteRecord = async (id: number) => {
    await supabase.from("records").delete().eq("id", id);
    toast("Income has been deleted");
    await loadRecords();
  };

  const addRecord = async () => {
    if (!session) return;

    let quantity: number | undefined;
    let rate: number | undefined;

    loading = true;

    if (incomeForm.currency === "GEL") {
      quantity = 1;
      rate = 1;
    } else {
      const rates = await getExchangeRate(incomeForm.date);
      if (rates && rates.length === 1) {
        const [dayRates] = rates;
        const currencyRate = dayRates.currencies.find(
          (item) => item.code === incomeForm.currency
        );

        if (currencyRate) {
          quantity = currencyRate.quantity;
          rate = currencyRate.rate;
        }
      }
    }

    if (quantity && rate) {
      const income = parseFloat(incomeForm.income);
      const amount = Math.ceil((income / quantity) * rate * 100) / 100;
      await supabase.from("records").insert<IncomeInsert>({
        uid: session.user.id,
        date: incomeForm.date,
        currency: incomeForm.currency,
        rate: Math.round((rate / quantity) * 10000) / 10000,
        income,
        amount,
      });
      toast("New income has been added");
      await loadRecords();
      incomeForm.income = "";
    }

    loading = false;
  };
</script>

<div class={container({ py: 4, maxW: "2xl" })}>
  {#if session}
    <div class={stack({ gap: 6 })}>
      <div class={hstack({ justifyContent: "space-between" })}>
        <p>Getax</p>
        <User email={session.user.email} {signOut} />
      </div>

      {#each Array.from(incomeYears).sort() as year}
        <div
          class={css({
            fontSize: "sm",
            py: 1,
            px: 4,
            mx: "auto",
            fontWeight: "semibold",
            textAlign: "center",
            color: "slate.500",
            bg: "slate.100",
            rounded: "full",
          })}
        >
          {year}
        </div>

        {#each getMonthsTillPresent(year) as month, i}
          <div>
            <div
              class={css({
                fontSize: "sm",
                fontWeight: "semibold",
                color: "slate.600",
                mb: 1,
              })}
            >
              {month}
            </div>

            {#if incomes[year] && incomes[year][i]}
              <table class={table()}>
                {#each incomes[year][i] as { id, date, income, currency, rate, amount }}
                  <tr>
                    <td class={css({ color: "slate.500" })}>
                      {format(date, "d MMMM yyyy")}
                    </td>
                    <td>
                      <div
                        class={grid({
                          gap: 0,
                          textAlign: "center",
                          columns: { base: 2, xs: 3 },
                        })}
                      >
                        <Amount value={income} {currency} />

                        <div
                          class={css({
                            py: 0.5,
                            display: { base: "none", xs: "block" },
                          })}
                        >
                          <a
                            href="https://nbg.gov.ge/en/monetary-policy/currency"
                            target="_blank"
                            class={css({
                              color: "slate.400",
                              fontFamily: "mono",
                            })}
                          >
                            ×{rate.toFixed(4)}
                          </a>
                        </div>

                        <Amount value={amount} currency="GEL" />
                      </div>
                    </td>
                    <td>
                      <button
                        class={button({ variant: "icon" })}
                        on:click={() => deleteRecord(id)}
                      >
                        <IconTrash size={14} />
                      </button>
                    </td>
                  </tr>
                {/each}
              </table>
            {:else}
              <p class={css({ fontSize: "xs", color: "slate.400" })}>
                No any incomes
              </p>
            {/if}
          </div>
        {/each}
      {/each}

      <form on:submit|preventDefault={addRecord}>
        <div class={hstack()}>
          <input
            id="date"
            type="date"
            max={today}
            placeholder="YYYY-MM-DD"
            class={input()}
            disabled={loading}
            bind:value={incomeForm.date}
          />
          <input
            id="income"
            type="number"
            step="0.01"
            placeholder="1000.00"
            class={input()}
            disabled={loading}
            bind:value={incomeForm.income}
          />
          <select
            id="currency"
            placeholder="USD"
            class={input()}
            disabled={loading}
            bind:value={incomeForm.currency}
          >
            {#each CURRENCIES as [code, label]}
              <option value={code}>{code} · {label}</option>
            {/each}
          </select>

          <button
            class={button({ style: "primary" })}
            type="submit"
            disabled={loading}
          >
            Add
          </button>
        </div>
      </form>

      <div class={divider({ color: "slate.200" })} />

      <div class={grid({ columns: 2 })}>
        <Field
          title="Field 15"
          badge={`${settlementYear}`}
          subtitle="Income from the beginning of a calendar year with the increased sum"
          value={yearSum}
        />
        <Field
          title="Field 17"
          badge={MONTHS[settlementMonth]}
          subtitle="Taxable income corresponding with the reporting month"
          value={monthSum}
        />
      </div>
    </div>
  {:else}
    <form on:submit={signIn}>
      <div class={stack()}>
        <input
          type="email"
          name="email"
          class={input()}
          placeholder="name@example.com"
          bind:value={loginForm.email}
        />
        <button class={button({ style: "primary" })}>Sign in</button>
      </div>
    </form>
  {/if}
</div>
