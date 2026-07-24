import MainLayout from "../../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto py-24 px-6">

        <h1 className="text-6xl font-bold">
          Welcome to
          <span className="text-blue-600">
            {" "}CodeHustle
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-500 max-w-2xl">
          The ultimate platform to organize hackathons,
          collaborate with teams, submit innovative projects,
          and compete for exciting prizes.
        </p>

      </div>

    </MainLayout>
  );
}

export default Home;