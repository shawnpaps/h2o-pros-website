export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What areas do you serve?',
    answer:
      'We serve five counties across the greater Tampa Bay area: Hillsborough, Polk, Pasco, Pinellas, and Marion. Not sure if you’re in range? Give us a call at (813) 702-1118 and we’ll let you know.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Fully. We hold Florida plumbing license CFC1434503 and carry complete insurance and bonding. You’re welcome to verify our license with the Florida DBPR at any time.',
  },
  {
    question: 'How does your pricing work?',
    answer:
      'Upfront, flat-rate pricing — you approve the exact price before any work begins, and the quote doesn’t change once we start. No hourly meters, no surprise line items.',
  },
  {
    question: 'Do you offer free water testing?',
    answer:
      'Yes. If you’re curious about hardness, chlorine, or anything else in your water, we’ll test it in your home for free and walk you through the results with zero obligation.',
  },
  {
    question: 'What brands of water heaters and filtration systems do you install?',
    answer:
      'We install proven, warranty-backed equipment from major manufacturers and will size and spec the right unit for your home and budget. We service nearly every brand, even ones we didn’t install.',
  },
  {
    question: 'Do you offer any guarantees on your work?',
    answer:
      'Every job is backed by our workmanship guarantee on top of the manufacturer’s warranty. If something isn’t right, call us and we’ll make it right.',
  },
];
