import Navbar from "./Navbar"
import ContentSections from "./ContentSections"
function Home() {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvXoNTBYMtV_d_kL-KECFIzBEhETK2Gt4QdJz8yIlIoB2t3HK",
  ];
  return (
    <>
    <ContentSections title="Newly Released" images={images} />
    <ContentSections title="Most Popular" images={images} />
    </>
  )
}

export default Home