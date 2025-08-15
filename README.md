# 📚 Zeroest - Lectures & Research Content
It's is designed to document my research and lectures in a clean, organized way.


> The structure, **Page Zero**, is a minimalist, tree-based framework for organizing and presenting content clearly.
>
> - The `main` branch contains my **published content**, curated for clarity and consumption.  
> - The `dev` branch contains the **core source code and structural scaffolding** a clean, content-free foundation with layout logic that anyone can reuse to build their own tree-based learning system.
>
> Page Zero emphasizes clean hierarchy a minimalist, tree-based framework for organizing and presenting educational content clearly. It's ideal for:

- 📘 Lecture Notes
- 🧪 Research Logs
- 📄 Academic Papers
- ✍️ Technical Blogs
- 📂 Nested Outlines & Docs

The app renders content from a local JSON file and supports powerful filtering via URL parameters with a clean, black-and-white monospace layout.

---

## 🛠 Features

- ✅ **Minimalist Design** - Distraction-free, perfect for printing.
- 📁 **Nested Topic Tree** - Organize deeply nested sections.
- 🔍 **Filtering** - Filter content via URL parameters.
- 🧠 **Hidden Topics** - Keep draft items hidden from view.
- 📎 **Static Pages with Table of Contents** - Blog-style layout (sample at [sample-page.html](pages/sample-page.html)).
- 📐 **LaTeX** - Put LaTeX-style math expressions directly in your HTML.
- 🔤 **Base64 Filter Support** - Secure URL filtering with encoded parameters.

---

# 🔎 Filtering Usage

Filter topics using URL parameters to link to specific lectures, subject groups, or custom views.

---

## 📌 URL Filter Usage Examples

```txt
?id=math,cs              ← Show only topics with matching IDs  
?category=STEM           ← Show topics matching categories  
?id=algebra&category=Science  ← Combine ID + category filters
```

- Multiple values can be comma-separated

---

## 🔐 Base64 Encoded Filters

You can pass filters as a Base64-encoded string instead of plain query parameters. This is useful for encoding structured data or hiding details from plain view.

### ✅ Format

**Plain JSON:**
```json
{
  "ids": ["math"],
  "categories": ["STEM","numbers"]
}
```

**Base64 URL:**
```
/?data=ewogICJpZHMiOiBbIm1hdGgiXSwKICAiY2F0ZWdvcmllcyI6IFsiU1RFTSIsIm51bWJlcnMiXQp9
```

---

## 📂 Use Cases

| Use Case            | How to Use                                          |
|---------------------|-----------------------------------------------------|
| Single Lecture Set  | `?id=lecture1`                                      |
| Subject Category    | `?category=Physics`                                 |
| Encoded Links       | Use `/?data=...`                                    |
| Drafts/Hidden Work  | Use `"hidden": true` in `data.json` to hide in view |

---

## 🚀 How to Start

1. Place your `data.json` in the data folder.  
2. Customize the JSON structure to match your topics.  
3. Add and link static pages.  
4. Pass filters via the URL to view focused content.

---

## 📚 JSON Structure

The app expects a `data.json` structured like this [sample-data.json](/data/sample-data.json)


---

## 📄 License

**MIT** - free to use, modify, and distribute.

---
### Crafted by [Ali](https://ali.inuni.space)

> If this work resonates with you, improve it, share it, or simply let it inspire your next idea. 🌱
---

Δ∞