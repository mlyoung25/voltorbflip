import React from "react"
const siteMetadata = {
  defaultTitle: "Voltorb Flip",
  titleTemplate: "%s | Voltorb Flip",
  defaultDescription: "",
}

const SEO = ({ title, description }) => {
  React.useEffect(() => {
    const resolvedTitle = title || siteMetadata.defaultTitle
    document.title = siteMetadata.titleTemplate.replace("%s", resolvedTitle)

    const metaDescription =
      description !== null ? description : siteMetadata.defaultDescription
    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta")
      descriptionTag.setAttribute("name", "description")
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.setAttribute("content", metaDescription)
  }, [title, description])

  return null
}

export default SEO

SEO.defaultProps = {
  title: null,
  description: null,
}
