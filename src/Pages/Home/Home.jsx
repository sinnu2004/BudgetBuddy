import AddExpense from "../../components/AddExpense/AddExpense"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"

const Home = () => {


  return (
    <div className="bg-neutral-900">
      <Navbar />
      <AddExpense />
      <Footer />
    </div>
  )
  
}
export default Home
