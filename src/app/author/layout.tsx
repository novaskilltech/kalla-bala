import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الشيخ علي توفيق النحاس | كَلَّا وبَلَى',
  description: 'سيرة الشيخ علي بن محمد توفيق النحاس رحمه الله، عالم القراءات ومؤلف رسالة الوقف على كَلَّا وبَلَى، مع عرض لأبرز مؤلفاته وآثاره العلمية.',
  openGraph: {
    title: 'الشيخ علي توفيق النحاس | كَلَّا وبَلَى',
    description: 'سيرة الشيخ علي بن محمد توفيق النحاس رحمه الله، عالم القراءات ومؤلف رسالة الوقف على كَلَّا وبَلَى.',
    url: 'https://kalla-bala.vercel.app/author',
    siteName: 'كَلَّا وَبَلَى',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'الشيخ علي توفيق النحاس | كَلَّا وبَلَى',
    description: 'سيرة الشيخ علي بن محمد توفيق النحاس رحمه الله ومؤلفاته في القراءات والتجويد والوقف والابتداء.',
  },
};

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
