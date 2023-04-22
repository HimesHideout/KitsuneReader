export default defineEventHandler((event) => {
  let chapters = [
    {id: 1, chapter_number: 1, title: "Attack on Donut", cover: "/images/test/Test (1).png", pages: 3},
    {id: 2, chapter_number: 2, title: "Re:Zero Deaths, Over", cover: "/images/test/Test (2).png", pages: 4},
    {id: 3, chapter_number: 3, title: "Your Card in April", cover: "/images/test/Test (3).png", pages: 3},
    {id: 4, chapter_number: 4, title: "New Crunchy City Revengers", cover: "/images/test/Test (3).png", pages: 3},
    {id: 5, chapter_number: 5, title: "There's no Card in Ba Sing Se", cover: "/images/test/Test (3).png", pages: 3},
  ]
  return chapters
})
