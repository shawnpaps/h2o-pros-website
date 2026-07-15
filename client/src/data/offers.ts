export interface Offer {
  title: string;
  detail: string;
  fine?: string;
}

export const offers: Offer[] = [
  {
    title: 'Free Whole-Home Water Test',
    detail: 'In-home testing for hardness, chlorine, and more — with zero-pressure results.',
    fine: 'No purchase necessary. Ever.',
  },
  {
    title: '$75 Off Any Water Heater Install',
    detail: 'Tank or tankless — mention this offer when you book.',
    fine: 'One per household. Cannot combine with other offers.',
  },
  {
    title: '10% Senior, Military & First-Responder Discount',
    detail: 'Our thank-you to the folks who look after everyone else.',
    fine: 'Applies to labor on any standard service.',
  },
];
