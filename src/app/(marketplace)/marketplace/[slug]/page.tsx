import { PagePlaceholder } from "@/components"

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params

  return <PagePlaceholder eyebrow="Marketplace" title={slug.replaceAll("-", " ")} description="Product details, pricing and delivery estimates from the ySpace network." />
}
