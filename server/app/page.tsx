// import connectToMongoDB from "../mongoose";
import connectToMongoDB from "../utils/mongoose";
// Өөрийн Model-оо энд import хийнэ (Жишээ нь Category)
// import Category from "@/models/category";

const Home = async () => {
  try {
    // 1. Датабааз руу холбогдох
    await connectToMongoDB();

    // 2. Датагаа датабаазаас шууд авах (Жишээ)
    // const categories = await Category.find({});

    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Food Delivery Data</h1>
        <p className="text-green-500">Database connected successfully!</p>

        {/* Энд датагаа loop-дэж харуулна */}
        <pre>{/* JSON.stringify(categories, null, 2) */}</pre>
      </div>
    );
  } catch (error) {
    return <div>Error connecting to DB: {JSON.stringify(error)}</div>;
  }
};

export default Home;
