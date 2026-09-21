import { Container } from "@/components/ui"
import { item1, item2, item3, item4 } from "@public/index"

import { CategoryCard } from "./category-card"

const categories = [
  {
    title: "Food & Groceries",
    description: "Shop household items from your trusted stores and supermarkets nearby.",
    image: item1,
  },
  {
    title: "Electronics",
    description: "Any kind of electronics from your trusted stores and supermarkets nearby.",
    image: item2,
  },
  {
    title: "Medications",
    description: "Any health and wellness items from your trusted stores and supermarkets nearby.",
    image: item3,
  },
  {
    title: "Fashions",
    description: "Any kind of wears from your trusted stores and supermarkets nearby.",
    image: item4,
  },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-warning-50 scroll-mt-20 pt-12 pb-21">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:gap-21">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-h2-m md:text-h2 text-neutral-900">Any item at all, shop at Yspace.</h2>
            <p className="text-h3-m md:text-h4 font-medium text-neutral-300">From everyday essentials to specialty items, we have everything you need</p>
          </div>
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
