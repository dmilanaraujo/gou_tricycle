import DriverSearch from '@/components/client/driver-search';
import NavBar from "@/components/layout/nav-bar";
import HeroSection from "@/components/layout/hero-section";
import CategorySection from "@/components/layout/category-section";
import SearchResultSection from "@/components/layout/search-result-section";

const blogdata = [
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-02.png',
        date: 'January 20, 2026',
        blogTitle: 'Build with Empathy for Better User Outcomes',
        description: 'Understand user needs to create intuitive and lovable experiences.',
        author: 'Allen Reilly',
        badge: 'UI',
        authorLink: '#',
        blogLink: '#',
        categoryLink: '#'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-03.png',
        date: 'May 20, 2025',
        blogTitle: 'Write Code That Scales with Your Product',
        description: 'Structure your projects for easier updates, faster growth, and bugs.',
        author: 'Sara Wilkerson',
        badge: 'Coding',
        authorLink: '#',
        blogLink: '#',
        categoryLink: '#'
    }
]

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center">
          {/*<DriverSearch />*/}
          <NavBar/>
          <HeroSection blogdata={blogdata}/>
          <CategorySection blogdata={blogdata}/>
          <SearchResultSection blogdata={blogdata}/>
      </main>
  );
}
