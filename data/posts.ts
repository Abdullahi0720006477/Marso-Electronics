import type { Post } from '../types';

export const posts: Post[] = [
  {
    id: 1,
    title: 'The Future of Smartphones: What to Expect in 2024',
    slug: 'future-of-smartphones-2024',
    excerpt: 'As technology races forward, the smartphones of tomorrow promise to be more integrated into our lives than ever before. From AI-powered assistants to foldable screens becoming mainstream, let\'s explore the trends shaping the future.',
    content: `
## The AI Revolution in Your Pocket

Artificial intelligence is no longer a buzzword; it's a core feature. Expect smarter, more predictive user interfaces, cameras that can identify objects and suggest edits in real-time, and battery management systems that learn your usage patterns to last longer.

## Foldables Go Mainstream

What was once a niche, expensive category is set to become more accessible. Companies are refining the technology, making foldable devices more durable and affordable. The convenience of a large tablet-sized screen that fits in your pocket is a game-changer for productivity and media consumption.

## Camera Systems Get Even Smarter

Computational photography will continue to push the boundaries of what's possible with a mobile camera. Expect better low-light performance, cinematic video modes becoming standard, and AI algorithms that can perfect every shot you take.
    `,
    author: 'Admin',
    date: 'October 26, 2023',
    imageUrl: 'https://picsum.photos/seed/blog1/800/600',
  },
  {
    id: 2,
    title: 'Choosing the Right Laptop for Your Needs',
    slug: 'choosing-the-right-laptop',
    excerpt: 'With so many options on the market, picking a new laptop can be daunting. Are you a gamer, a creative professional, or a student? This guide will help you break down the specs that matter most to you.',
    content: `
### For the Student

Portability, battery life, and affordability are key. Look for lightweight ultrabooks with efficient processors that can last a full day of classes. A comfortable keyboard is a must for those long essay-writing sessions.

### For the Creative Professional

Power is paramount. Video editors, graphic designers, and 3D artists need dedicated graphics cards, high-resolution color-accurate displays, and plenty of fast RAM and storage. Look at workstation-class laptops that can handle demanding software without breaking a sweat.

### For the Gamer

A high refresh-rate display and a powerful GPU are non-negotiable. An effective cooling system is also critical to prevent thermal throttling during intense gaming sessions. Don't forget to check for customizable RGB lighting for that extra flair!
    `,
    author: 'Admin',
    date: 'November 5, 2023',
    imageUrl: 'https://picsum.photos/seed/blog2/800/600',
  },
  {
    id: 3,
    title: 'The Rise of Wearable Tech: More Than Just a Smartwatch',
    slug: 'rise-of-wearable-tech',
    excerpt: 'Wearable technology has moved beyond simple fitness tracking. Today\'s devices are sophisticated health monitors, communication tools, and fashion statements. Let\'s look at where the industry is heading.',
    content: `
From smart rings that track your sleep quality with incredible accuracy to augmented reality glasses that overlay digital information onto the real world, the world of wearables is expanding rapidly. These devices are becoming smaller, more powerful, and more seamlessly integrated into our daily routines, offering a glimpse into a future where technology is truly personal.
    `,
    author: 'Admin',
    date: 'November 18, 2023',
    imageUrl: 'https://picsum.photos/seed/blog3/800/600',
  },
];
