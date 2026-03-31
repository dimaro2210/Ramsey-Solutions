import { Router } from "express";

const router = Router();

interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  question: string;
  answer: string;
  link?: string;
  linkLabel?: string;
  category: string;
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "debt-snowball",
    topic: "Debt Snowball Method",
    keywords: ["debt", "snowball", "pay off", "pay down", "paying off", "get out of debt", "eliminate debt", "debt free", "credit card", "car loan", "student loan", "medical debt", "owe", "minimum payment"],
    question: "How do I get out of debt?",
    answer: "The Debt Snowball method is the fastest way to get out of debt. List your debts from smallest to largest balance (regardless of interest rate). Pay minimum payments on everything except the smallest debt — attack that one with every extra dollar you have. Once it's paid off, roll that payment into the next smallest debt. This creates momentum (like a snowball rolling downhill) and keeps you motivated. The average household following this method pays off all non-mortgage debt in 18–24 months.",
    link: "/debt/debt-101",
    linkLabel: "Learn More About Debt",
    category: "Debt"
  },
  {
    id: "baby-steps-overview",
    topic: "The 7 Baby Steps",
    keywords: ["baby steps", "7 steps", "seven steps", "plan", "financial plan", "get started", "where to start", "begin", "roadmap", "steps", "dave ramsey plan", "proven plan"],
    question: "What are the 7 Baby Steps?",
    answer: "The 7 Baby Steps are Dave Ramsey's proven plan to take control of your money:\n\nBaby Step 1: Save $1,000 for a starter emergency fund.\nBaby Step 2: Pay off all debt (except the house) using the Debt Snowball.\nBaby Step 3: Save 3–6 months of expenses in a fully funded emergency fund.\nBaby Step 4: Invest 15% of your household income in retirement.\nBaby Step 5: Save for your children's college fund.\nBaby Step 6: Pay off your home early.\nBaby Step 7: Build wealth and give generously.\n\nMillions of people have used these steps to transform their finances.",
    link: "/dave-ramsey-7-baby-steps",
    linkLabel: "See the Full 7 Baby Steps",
    category: "Getting Started"
  },
  {
    id: "emergency-fund",
    topic: "Emergency Fund",
    keywords: ["emergency fund", "emergency", "savings", "save", "rainy day", "starter fund", "1000", "3 months", "6 months", "unexpected expense", "safety net"],
    question: "How much should I save for an emergency fund?",
    answer: "Your emergency fund depends on which Baby Step you're on:\n\nBaby Step 1: Save $1,000 as fast as you can. This is your starter emergency fund to cover small surprises while you focus on paying off debt.\n\nBaby Step 3: After you're debt-free (except the mortgage), build a fully funded emergency fund of 3–6 months of expenses. If your income is less stable or you're a single-income household, aim for 6 months. If your income is stable and you have two incomes, 3–4 months may be enough.\n\nKeep your emergency fund in a simple savings or money market account — somewhere easy to access but separate from your checking account.",
    link: "/dave-ramsey-7-baby-steps",
    linkLabel: "Learn About the Baby Steps",
    category: "Saving"
  },
  {
    id: "budget",
    topic: "Budgeting with EveryDollar",
    keywords: ["budget", "budgeting", "everydollar", "every dollar", "track spending", "spending", "money plan", "zero-based", "zero based", "where does my money go", "manage money", "save money", "monthly budget"],
    question: "How do I create a budget?",
    answer: "A zero-based budget means your income minus your expenses equals zero — every dollar has a job. Here's how to start:\n\n1. Write down your monthly income.\n2. List every expense (housing, food, utilities, transportation, etc.).\n3. Subtract expenses from income until you hit zero.\n4. Track your spending throughout the month.\n\nEveryDollar is Ramsey's free budgeting app that makes this easy. It takes about 15 minutes to set up, and the average new user finds $3,015 in their budget in the first month. That's money you didn't even know you had!",
    link: "/money/everydollar",
    linkLabel: "Try EveryDollar for Free",
    category: "Budgeting"
  },
  {
    id: "investing",
    topic: "Investing & Retirement",
    keywords: ["invest", "investing", "retirement", "401k", "roth ira", "ira", "mutual fund", "stock market", "stocks", "portfolio", "smartvestor", "financial advisor", "compound interest", "growth", "wealth"],
    question: "How should I start investing?",
    answer: "Once you're debt-free with a full emergency fund (Baby Steps 1–3 complete), invest 15% of your gross household income into retirement accounts.\n\nHere's the recommended order:\n1. Invest in your employer's 401(k) up to the match (that's free money!).\n2. Max out a Roth IRA.\n3. Go back to your 401(k) and increase contributions to reach 15%.\n\nFocus on good growth stock mutual funds spread across four categories: Growth, Growth and Income, Aggressive Growth, and International. A SmartVestor Pro can help you choose the right funds and build a personalized plan.",
    link: "/retirement/smartvestor",
    linkLabel: "Find a SmartVestor Pro",
    category: "Investing"
  },
  {
    id: "real-estate",
    topic: "Buying or Selling a Home",
    keywords: ["house", "home", "buy a home", "sell a home", "real estate", "mortgage", "down payment", "home buying", "selling", "agent", "realtor", "housing"],
    question: "How do I buy or sell a home the right way?",
    answer: "Before buying a home, make sure you're on Baby Step 3b or beyond — meaning you're debt-free with a full emergency fund.\n\nKey rules for buying:\n• Save a down payment of at least 10–20% (20% avoids PMI).\n• Get a 15-year fixed-rate mortgage.\n• Keep your payment at 25% or less of your take-home pay.\n• Never buy a home just because you can \"afford\" the payment.\n\nA RamseyTrusted real estate agent is vetted by our team and will help you navigate the process without pushing you into more house than you can afford. The service is free to you.",
    link: "/real-estate/residential-real-estate",
    linkLabel: "Find a RamseyTrusted Agent",
    category: "Real Estate"
  },
  {
    id: "taxes",
    topic: "Filing Taxes",
    keywords: ["tax", "taxes", "file taxes", "tax return", "refund", "withholding", "w2", "1099", "tax pro", "irs", "deduction", "tax preparation"],
    question: "How do I file taxes the Ramsey way?",
    answer: "Filing taxes doesn't have to be stressful. Here's the Ramsey approach:\n\n1. Gather your documents: W-2s, 1099s, mortgage interest statements, and charitable giving receipts.\n2. Don't count on a big refund — if you're getting thousands back, you're giving the government an interest-free loan. Adjust your withholdings!\n3. Work with a tax pro who can help you maximize deductions legally.\n\nThe average American overpays $3,000 in taxes each year. A RamseyTrusted tax professional can make sure you're keeping more of your hard-earned money. That extra money in your monthly budget can accelerate your Baby Steps.",
    link: "/taxes",
    linkLabel: "File Taxes the Ramsey Way",
    category: "Taxes"
  },
  {
    id: "insurance",
    topic: "Insurance Coverage",
    keywords: ["insurance", "life insurance", "term life", "whole life", "auto insurance", "home insurance", "health insurance", "coverage", "protect", "protection", "identity theft", "id theft", "medicare", "long-term care", "wills", "estate"],
    question: "What insurance do I need?",
    answer: "Here's the insurance Dave Ramsey recommends:\n\n• Term Life Insurance: Get 10–12 times your income in a 15 or 20-year term policy. Never buy whole life, universal life, or cash-value insurance — they're expensive and a bad investment.\n• Home & Auto Insurance: Bundle for savings. Get the right deductible based on your emergency fund.\n• Health Insurance: Always have it. An unexpected medical emergency can wipe you out.\n• Identity Theft Protection: In today's digital world, this is a must-have.\n• Long-Term Care Insurance: Start looking at age 60.\n• Will/Estate Plan: Every adult needs a will. Don't leave your family guessing.\n\nRamseyTrusted insurance pros can do a free Coverage Checkup to make sure you're properly protected.",
    link: "/insurance",
    linkLabel: "Get a Coverage Checkup",
    category: "Insurance"
  },
  {
    id: "credit-cards",
    topic: "Credit Cards",
    keywords: ["credit card", "credit cards", "credit score", "rewards", "cash back", "points", "interest rate", "apr", "minimum payment", "credit card debt", "swipe"],
    question: "Should I use credit cards?",
    answer: "No! Dave Ramsey recommends cutting up your credit cards. Here's why:\n\n• You spend more when you use plastic — studies show 12–18% more than with cash.\n• Credit card \"rewards\" don't outweigh the overspending.\n• The average household with credit card debt owes over $7,000.\n• Interest rates average 20%+, which means you're paying the bank to use your own money.\n\nInstead, use a debit card and cash envelopes for spending categories where you tend to overspend (like food and entertainment). A zero-based budget with EveryDollar helps you plan every dollar so you don't need credit to get through the month.",
    link: "/debt/debt-101",
    linkLabel: "Learn About Getting Out of Debt",
    category: "Debt"
  },
  {
    id: "ramsey-show",
    topic: "The Ramsey Show",
    keywords: ["show", "podcast", "radio", "listen", "watch", "ramsey show", "dave ramsey show", "call in", "youtube", "spotify", "apple podcast", "hosts", "rachel cruze", "george kamel", "jade warshaw", "john delony", "ken coleman"],
    question: "Where can I listen to The Ramsey Show?",
    answer: "The Ramsey Show is the second-largest talk show in America with over 18 million weekly listeners. You can listen and watch on:\n\n• YouTube — Full episodes and clips daily.\n• Apple Podcasts — Subscribe for free.\n• Spotify — Stream anytime.\n• Radio — Check local listings for your station.\n\nHosts include Dave Ramsey, Rachel Cruze, George Kamel, Jade Warshaw, Dr. John Delony, and Ken Coleman. Each brings expertise in money, relationships, career, and personal growth.\n\nWant to be on the show? Call 1-888-825-5225 during live hours.",
    link: "/shows/the-ramsey-show",
    linkLabel: "Watch The Ramsey Show",
    category: "Shows"
  },
  {
    id: "trusted-pros",
    topic: "RamseyTrusted Professionals",
    keywords: ["trusted", "ramseyTrusted", "ramsey trusted", "pro", "professional", "advisor", "agent", "provider", "vetted", "find a pro", "recommend"],
    question: "What is RamseyTrusted?",
    answer: "RamseyTrusted is a network of professionals personally vetted by Ramsey Solutions. These pros have earned Dave's trust because they follow Ramsey principles and deliver excellent service.\n\nRamseyTrusted categories include:\n• Real Estate Agents — Help you buy or sell with confidence.\n• Insurance Providers — Get the right coverage at the right price.\n• Tax Professionals — File your taxes correctly and keep more money.\n• SmartVestor Pros — Investing advisors who help you build wealth.\n\nAll RamseyTrusted pros are free to connect with and have been through a thorough vetting process. They're committed to coaching you, not selling you something you don't need.",
    link: "/trusted",
    linkLabel: "Find a RamseyTrusted Pro",
    category: "Trusted Pros"
  },
  {
    id: "student-loans",
    topic: "Student Loans",
    keywords: ["student loan", "student loans", "college", "university", "tuition", "school debt", "education debt", "forgiveness", "loan forgiveness", "federal loan"],
    question: "How do I handle student loans?",
    answer: "Student loans should be included in your Debt Snowball (Baby Step 2). Here's the plan:\n\n1. List your student loans from smallest to largest balance.\n2. Pay minimums on all loans except the smallest.\n3. Throw every extra dollar at the smallest loan until it's gone.\n4. Roll that payment to the next loan.\n\nDon't wait for loan forgiveness — it rarely works out and keeps you in debt longer. Instead, get intense: pick up extra work, sell stuff, cut expenses, and attack those loans.\n\nFor future students: Cash-flow college through scholarships, grants, working, and choosing an affordable school. Save for your kids' college in Baby Step 5 using an Education Savings Account (ESA) or 529 plan.",
    link: "/debt/debt-101",
    linkLabel: "Learn the Debt Snowball Method",
    category: "Debt"
  },
  {
    id: "car-buying",
    topic: "Buying a Car",
    keywords: ["car", "car loan", "car payment", "vehicle", "auto loan", "buy a car", "used car", "new car", "lease", "car lease", "transportation"],
    question: "Should I take out a car loan?",
    answer: "Never take out a car loan or lease. Here's the Ramsey way to buy a car:\n\n• Drive your current car as long as possible.\n• Save up and pay cash for a reliable used car.\n• A good used car in the $5,000–$15,000 range can last years.\n• Once you're on Baby Step 4+, you can upgrade gradually by selling your current car and adding savings.\n\nThe average car payment in America is $700/month. If you invested that instead, you'd have over $5 million in 30 years! Car payments are one of the biggest wealth-killers in America. Remember: \"Act your wage.\"",
    link: "/debt/debt-101",
    linkLabel: "Get Out of Debt",
    category: "Debt"
  },
  {
    id: "giving",
    topic: "Generosity & Giving",
    keywords: ["give", "giving", "charity", "tithe", "tithing", "donate", "generous", "generosity", "church", "charitable"],
    question: "When should I start giving?",
    answer: "Dave Ramsey encourages giving at every stage of your financial journey. If you're a tither, keep tithing even while paying off debt — it's an important discipline.\n\nBaby Step 7 is \"Build Wealth and Give.\" This is where giving gets really fun — you have no debt, a full emergency fund, investments growing, and your house is paid off. You can give outrageously!\n\nGenerosity is the whole point of building wealth. As Dave says: \"Live like no one else, so later you can LIVE and GIVE like no one else.\" The most fulfilled people aren't the ones with the most stuff — they're the ones who give the most away.",
    link: "/dave-ramsey-7-baby-steps",
    linkLabel: "See Baby Step 7",
    category: "Getting Started"
  },
  {
    id: "marriage-money",
    topic: "Money & Marriage",
    keywords: ["marriage", "spouse", "partner", "couple", "husband", "wife", "relationship", "money fights", "financial peace", "together", "joint account"],
    question: "How do we handle money as a couple?",
    answer: "Money fights are the #1 cause of divorce, so getting on the same page is critical. Here's what Dave recommends:\n\n1. Combine your finances — no separate accounts. Marriage is a partnership.\n2. Do a monthly budget together. Sit down before the month begins and agree on the plan.\n3. Give each partner \"fun money\" — a set amount each person can spend with no questions asked.\n4. Agree on a spending limit (like $200) above which you have to talk to each other first.\n\nRemember: there's usually a \"nerd\" (loves spreadsheets) and a \"free spirit\" (hates budgets) in every relationship. Both need a voice. The nerd creates the budget, the free spirit gets to edit it. Financial Peace University is a great course to go through together.",
    category: "Relationships"
  },
  {
    id: "financial-peace-university",
    topic: "Financial Peace University",
    keywords: ["fpu", "financial peace", "class", "course", "learn", "education", "workshop", "membership", "ramsey plus", "ramsey+"],
    question: "What is Financial Peace University?",
    answer: "Financial Peace University (FPU) is Ramsey Solutions' flagship 9-lesson course on personal finance. It covers:\n\n• Budgeting and saving\n• Paying off debt with the Debt Snowball\n• Building an emergency fund\n• Investing and retirement planning\n• Insurance and real estate\n• Building wealth and generosity\n\nOver 10 million people have gone through FPU. The average family pays off $5,300 in debt and saves $2,700 in the first 90 days. You can take it online or find a local class through a church or community group near you. It includes access to EveryDollar premium and other Ramsey tools.",
    category: "Getting Started"
  },
  {
    id: "store",
    topic: "Ramsey Store & Products",
    keywords: ["store", "shop", "book", "books", "total money makeover", "baby steps millionaires", "everyday millionaires", "products", "journal", "planner"],
    question: "What books and products does Ramsey offer?",
    answer: "Ramsey Solutions offers many bestselling books and products:\n\n• The Total Money Makeover — Dave's classic guide to the Baby Steps. Over 5 million copies sold.\n• Baby Steps Millionaires — How ordinary people built extraordinary wealth following the Baby Steps.\n• Financial Peace Revisited — An updated look at building financial peace.\n• The Legacy Journey — For those on Baby Steps 4–7 who want to build wealth and leave a legacy.\n• Smart Money Smart Kids — By Dave Ramsey and Rachel Cruze, teaching kids about money.\n\nYou can find all books, planners, journals, and gift sets at the Ramsey Solutions store.",
    linkLabel: "Shop the Store",
    category: "Products"
  },
  {
    id: "crypto-trading",
    topic: "Crypto Trading",
    keywords: ["crypto", "cryptocurrency", "bitcoin", "ethereum", "solana", "btc", "eth", "blockchain", "defi", "web3", "altcoin", "token", "nft", "mining", "wallet", "exchange"],
    question: "How do I start trading crypto?",
    answer: "Ramsey Invest makes crypto trading simple and accessible. Here's how to get started:\n\n1. Create a trading account — sign up with your personal details and select 'Individual Trading' as your account type.\n2. Deposit funds — use bank transfer (free) or credit card (instant) to fund your account.\n3. Start trading — buy and sell popular cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and more.\n\nKey tips for crypto investing:\n• Only invest money you can afford to lose — crypto is volatile.\n• Start small and learn the market before making large trades.\n• Diversify across multiple cryptocurrencies.\n• Use dollar-cost averaging — invest a fixed amount regularly.\n• Keep long-term goals in mind rather than chasing short-term gains.\n\nSign up for a Ramsey Invest account to access real-time crypto prices, portfolio tracking, and trading tools.",
    link: "/sign-up",
    linkLabel: "Open a Trading Account",
    category: "Investing"
  },
  {
    id: "stock-trading",
    topic: "Stock Trading",
    keywords: ["stock", "stocks", "shares", "equity", "market", "nasdaq", "s&p", "dow jones", "dividend", "etf", "index fund", "trade", "trading", "broker", "brokerage", "portfolio"],
    question: "How do I start trading stocks?",
    answer: "Ramsey Invest gives you access to trade stocks from top companies like Apple, Microsoft, NVIDIA, Tesla, and more. Here's how to begin:\n\n1. Open a trading account — it's free and takes just minutes.\n2. Fund your account — deposit via bank transfer or card.\n3. Research and trade — browse stock prices, analyze trends, and make informed trades.\n\nStock investing fundamentals:\n• Invest for the long term — time in the market beats timing the market.\n• Diversify your portfolio across different sectors and industries.\n• Focus on quality companies with strong fundamentals.\n• Reinvest dividends to accelerate your growth.\n• Stay consistent — regular investing through market ups and downs builds wealth.\n\nYour Ramsey Invest dashboard shows real-time stock prices, portfolio performance, and complete trading history.",
    link: "/sign-up",
    linkLabel: "Start Trading Stocks",
    category: "Investing"
  },
  {
    id: "trading-dashboard",
    topic: "Trading Dashboard",
    keywords: ["dashboard", "portfolio", "account", "balance", "deposit", "withdraw", "history", "trading", "performance", "chart", "overview"],
    question: "How do I use the trading dashboard?",
    answer: "Your Ramsey Invest dashboard is your command center for managing investments. Here's what you'll find:\n\n• Overview — See your total balance, crypto holdings, stock holdings, and available cash at a glance. Live price tickers show real-time market movements.\n• Portfolio Chart — Track your portfolio performance over time (1D, 1W, 1M, 3M, 1Y views).\n• Deposit — Add funds to your account via bank transfer, credit/debit card, or crypto transfer.\n• Withdraw — Transfer funds out to your bank account or crypto wallet.\n• Trading History — View all your past buy and sell transactions with filters by type and asset class.\n• Contact Support — Reach our team by phone, email, or live chat for any questions.\n\nSign in to access your personalized dashboard with real-time data.",
    link: "/sign-in",
    linkLabel: "Sign In to Dashboard",
    category: "Investing"
  }
];

function searchKnowledge(query: string): KnowledgeEntry[] {
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);

  if (queryWords.length === 0) return knowledgeBase.slice(0, 6);

  const scored = knowledgeBase.map(entry => {
    let score = 0;

    const topicLower = entry.topic.toLowerCase();
    const questionLower = entry.question.toLowerCase();
    const answerLower = entry.answer.toLowerCase();

    if (topicLower.includes(normalizedQuery)) score += 50;
    if (questionLower.includes(normalizedQuery)) score += 40;

    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(keyword)) score += 30;
      if (keyword.includes(normalizedQuery)) score += 25;
    }

    for (const word of queryWords) {
      for (const keyword of entry.keywords) {
        if (keyword.includes(word)) score += 10;
        if (word.includes(keyword)) score += 8;
      }
      if (topicLower.includes(word)) score += 7;
      if (questionLower.includes(word)) score += 5;
      if (answerLower.includes(word)) score += 2;
    }

    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.entry);
}

router.get("/askramsey", (req, res) => {
  const q = (req.query.q as string) || "";
  const results = searchKnowledge(q);
  return res.json({ query: q, results });
});

export default router;
