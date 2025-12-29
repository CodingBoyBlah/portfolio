import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function GET() {
  try {
    const blogsDirectory = path.join(process.cwd(), "content/blogs")

    // Create directory if it doesn't exist
    if (!fs.existsSync(blogsDirectory)) {
      return NextResponse.json([])
    }

    const filenames = fs.readdirSync(blogsDirectory)
    const markdownFiles = filenames.filter((name) => name.endsWith(".md"))

    const blogs = markdownFiles.map((filename) => {
      const slug = filename.replace(/\.md$/, "")
      const filePath = path.join(blogsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      // Extract excerpt (first 150 chars of content)
      const excerpt = content.substring(0, 150).trim() + "..."

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split("T")[0],
        excerpt: data.excerpt || excerpt,
      }
    })

    // Sort by date (newest first)
    blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error reading blogs:", error)
    return NextResponse.json([])
  }
}
