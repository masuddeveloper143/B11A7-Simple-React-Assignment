import { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import './App.css'

function App() {

  const [favorites, setFavorites] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // ✅ Fetch Data
  useEffect(() => {
    fetch('assignment.json')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  // ✅ Add Favorite (duplicate block)
  const handleFavorite = (item) => {
    const exists = favorites.find(f => f.id === item.id);
    if (exists) return;

    setFavorites([...favorites, item]);
    setTotal(total + item.currentBidPrice);

    toast.success("Added to Favorites ❤️");
  };

  // ✅ Remove Favorite
  const handleRemove = (id, price) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    setTotal(total - price);
  };

  return (
    <>

      {/* NAVBAR */}
      <div className='mx-7'>
        <div className="navbar shadow-sm flex justify-between items-center">
          <a className="btn btn-ghost text-xl flex gap-0">
            Action<span className='text-red-400'>Gallary</span>
          </a>

          <ul className='flex gap-10'>
            <li>Home</li>
            <li>Auctions</li>
            <li>Categories</li>
            <li>Works</li>
          </ul>

          <img
            className="w-10 rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>

      {/* HERO */}
      <div
        className="hero min-h-[400px]"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-black/50"></div>
        <div className="hero-content text-white text-left">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Bid on Unique Items from <br /> Around the World
            </h1>
            <p className="mb-5 text-gray-300">
              Discover rare collectibles, luxury goods, and vintage treasures
            </p>
            <button className="btn bg-white text-black rounded-full">
              Explore Auctions
            </button>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className='mx-40 my-5'>
        <h1 className='text-3xl font-bold'>Active Auctions</h1>
        <p>Discover and bid on extraordinary items</p>
      </div>

      {/* MAIN */}
      <div className='flex gap-5 mx-40'>

        {/* 🔥 TABLE (IMPORTANT FIX) */}
        <div className='w-[70%]'>
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Items</th>
                <th>Current Bid</th>
                <th>Time Left</th>
                <th>Bid</th>
              </tr>
            </thead>

            <tbody>
              {
                data.map(item => (
                  <tr key={item.id}>
                    <td className="flex items-center gap-3">
                      <img className="w-12" src={item.image} />
                      {item.title}
                    </td>

                    <td>${item.currentBidPrice}</td>
                    <td>{item.timeLeft}</td>

                    <td>
                      <button
                        onClick={() => handleFavorite(item)}
                        disabled={favorites.find(f => f.id === item.id)}
                        className={
                          favorites.find(f => f.id === item.id)
                            ? "text-red-500 cursor-not-allowed"
                            : ""
                        }
                      >
                        <CiHeart size={25} />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* ❤️ FAVORITES */}
        <div className='w-[30%]'>
          <div className="bg-white shadow rounded-xl border">

            <h2 className="p-4 border-b font-bold text-lg">
              ❤️ Favorite Items
            </h2>

            {
              favorites.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No favorites yet
                </div>
              ) : (
                favorites.map(item => (
                  <div key={item.id} className="flex justify-between p-3 border-b">
                    <p>{item.title}</p>
                    <p>${item.currentBidPrice}</p>

                    <button
                      onClick={() => handleRemove(item.id, item.currentBidPrice)}
                      className="text-red-500"
                    >
                      ❌
                    </button>
                  </div>
                ))
              )
            }

            {/* TOTAL */}
            <div className="p-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t py-8 mt-10 text-center">
        <h2 className="text-xl font-bold">
          Auction<span className="text-yellow-500">Gallery</span>
        </h2>
        <p className="text-gray-500 mt-2">Bid. Win. Own.</p>
      </footer>

    </>
  )
}

export default App