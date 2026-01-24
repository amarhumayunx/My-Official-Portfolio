/**
 * Structured Data (Schema.org) Utilities
 * Provides JSON-LD structured data for SEO
 */

export interface PersonSchema {
  name: string
  url: string
  jobTitle: string
  description: string
  sameAs: string[]
  knowsAbout: string[]
  email?: string
  address?: {
    addressLocality: string
    addressCountry: string
  }
}

export interface ProjectSchema {
  name: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author: {
    name: string
    url: string
  }
  technologies?: string[]
  category?: string[]
}

export interface BlogPostSchema {
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
    url: string
  }
  publisher: {
    name: string
    url: string
  }
}

export interface BreadcrumbSchema {
  items: Array<{
    name: string
    url: string
  }>
}

export interface OrganizationSchema {
  name: string
  url: string
  logo?: string
  description?: string
}

/**
 * Generate Person schema
 */
export function generatePersonSchema(data: PersonSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    url: data.url,
    jobTitle: data.jobTitle,
    description: data.description,
    sameAs: data.sameAs,
    knowsAbout: data.knowsAbout,
    ...(data.email && { email: data.email }),
    ...(data.address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: data.address.addressLocality,
        addressCountry: data.address.addressCountry,
      },
    }),
  }
}

/**
 * Generate Project schema
 */
export function generateProjectSchema(data: ProjectSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    ...(data.datePublished && { datePublished: data.datePublished }),
    ...(data.dateModified && { dateModified: data.dateModified }),
    author: {
      "@type": "Person",
      name: data.author.name,
      url: data.author.url,
    },
    applicationCategory: "MobileApplication",
    operatingSystem: "Android, iOS",
    ...(data.technologies && { softwareRequirements: data.technologies.join(", ") }),
    ...(data.category && { keywords: data.category.join(", ") }),
  }
}

/**
 * Generate Blog Post schema
 */
export function generateBlogPostSchema(data: BlogPostSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.headline,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    author: {
      "@type": "Person",
      name: data.author.name,
      url: data.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: data.publisher.name,
      url: data.publisher.url,
    },
  }
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(data: BreadcrumbSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
  }
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(url: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  provider: { name: string; url: string },
  areaServed?: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Person",
      name: provider.name,
      url: provider.url,
    },
    serviceType: "Mobile Application Development",
    ...(areaServed && {
      areaServed: areaServed.map((area) => ({
        "@type": "Country",
        name: area,
      })),
    }),
  }
}
