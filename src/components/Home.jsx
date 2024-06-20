import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Pie, Bar, Doughnut, Radar } from "react-chartjs-2";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/authSlice";
import Empty from "../assets/empty-cart.jpg";
// Explicitly register the elements and scales
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.auth.users);

  useEffect(() => {
    const fetchInfo = async () => {
      setShowLoader(true); // Show loader when fetching data
      try {
        const response = await api.get("/api/products/allproducts");
        setAllProducts(response.data.products);
        await dispatch(fetchAllUsers());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setShowLoader(false); // Hide loader after fetching data
    };

    fetchInfo();
  }, []);

  console.log(allProducts);
  console.log(allUsers);

  const numberOfUser = allUsers?.length;

  const categories = [
    ...new Set(allProducts.map((product) => product.category_name)),
  ];
  const numberOfCategories = categories?.length;
  const totalProducts = allProducts?.length;
  const productsInEachCategory = categories.map((category) => ({
    title: category,
    number: allProducts.filter((product) => product.category_name === category)
      .length,
  }));

  const pieData = {
    labels: productsInEachCategory.map((category) => category.title),
    datasets: [
      {
        data: productsInEachCategory.map((category) => category.number),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Adjust colors as needed
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Adjust colors as needed
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  const barData = {
    labels: productsInEachCategory.map((category) => category.title),
    datasets: [
      {
        label: "Number of Products",
        data: productsInEachCategory.map((category) => category.number),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Adjust colors as needed
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"], // Adjust colors as needed
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Change color of y-axis values
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: "white", // Change color of x-axis values
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ""; // Use let instead of const
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Number(context.parsed.y).toLocaleString();
            }
            return label;
          },
        },
      },
    },
  };

  const donutData = {
    labels: ["Mumbai", "Kolkata", "Bangalore", "Hyderabad", "Others"],
    datasets: [
      {
        data: [30, 27, 50, 34, 29], // Adjusted numbers based on your description
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  const radarData = {
    labels: ["Jordan", "Adidas", "Nike", "Converse", "Reebok", "Under Armour"],
    datasets: [
      {
        label: "Number of Products",
        data: [11, 5, 8, 3, 1, 5],
        backgroundColor: "rgba(255, 9, 0, 0.3)",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          color: "white", // Change color of radial axis values
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="text-white flex flex-col  w-full rounded-sm mt-4 lg:m-7 p-8 box-border">
      <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-3 gap-x-2 lg:gap-x-10">
        {/* Row 1 */}
        <div className="p-5 text-center ring-1 ring-white rounded-md">
          <h3 className="font-anta text-[24px]">Total Products</h3>
          <div className="font-anta text-[30px] text-extrabold">
            {totalProducts}
          </div>
        </div>
        <div className="p-5 text-center ring-1 ring-white rounded-md">
          <h3 className="font-anta text-[24px]">No. of Categories</h3>
          <div className="font-anta text-[30px] text-extrabold">
            {numberOfCategories}
          </div>
        </div>
        <div className="p-5 text-center ring-1 ring-white rounded-md">
          <h3 className="font-anta text-[24px]">No. of Users</h3>
          <div className="font-anta text-[30px] text-extrabold">{numberOfUser}</div>
        </div>
      </div>


      {/* row 2 */}
      <div>
        <h4 className="font-anta text-center mt-10 text-[24px]">
          No. of Products in Each Category
        </h4>
      </div>

        <div>
          {allProducts.length > 0 ? (
            <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-4 gap-x-2 lg:gap-x-10 mt-2">
            {/* Row 2 */}
            {productsInEachCategory.map((pr, index) => (
              <div
                key={index}
                className="p-5 text-center ring-1 ring-white rounded-md"
              >
                <h3 className="font-anta text-[24px]">{pr.title}</h3>
                <div className="font-anta text-[30px] text-extrabold">
                  {pr.number}
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="flex flex-col justify-center items-center bg-black/60 py-8 rounded-full">
            <img src={Empty} className="rounded-full h-64" />
            <p className="font-anta text-white text-center mt-5">
              No Products to show
            </p>
          </div>
          )}
        </div>





       {/* <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-4 gap-x-2 lg:gap-x-10 mt-2">
         Row 2
         {productsInEachCategory.map((pr, index) => (
           <div
             key={index}
             className="p-5 text-center ring-1 ring-black rounded-md"
           >
             <h3 className="font-anta text-[24px]">{pr.title}</h3>
             <div className="font-anta text-[30px] text-extrabold">
               {pr.number}
             </div>
           </div>
         ))}
       </div> */}

      <div>
        <h4 className="font-anta text-center mt-10 text-[24px]">
          Graphical representation
        </h4>
      </div>

      <div className="flex lg:flex-row flex-col justify-center items-center mt-2 gap-x-20">
        {/* Row 3 */}

        {/* PIE CHART */}
        <div className="mt-10 max-w-[300px] w-full ring-1 ring-white p-6 rounded-md text-white">
          <h4 className="font-anta text-center mt-10 text-[24px]">
            Products Distribution
          </h4>
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* RADAR CHART */}
        <div className="mt-10 max-w-[300px] w-full ring-1 ring-white p-6 rounded-md text-white">
          <h4 className="font-anta text-center mt-10 text-[24px]">
            Products by Brand
          </h4>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* DONUT CHART */}
        <div className="mt-10 max-w-[300px] w-full ring-1 ring-white p-6 rounded-md text-white">
          <h4 className="font-anta text-center mt-10 text-[24px]">
            User Demographics
          </h4>
          <Doughnut data={donutData} options={donutOptions} />
        </div>
      </div>
      <div className="mt-10 w-full ring-1 ring-white p-6 rounded-md">
        <h4 className="font-anta text-center mt-10 text-[24px]">
          Products in Each Category
        </h4>
        <Bar data={barData} options={barOptions} className=" lg:h-[300px]" />
      </div>
    </div>
  );
};

export default Home;
