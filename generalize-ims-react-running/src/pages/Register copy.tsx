import React from 'react';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ims-bg bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-cod-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-cod-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-cod-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-cod-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-cod-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-cod-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-cod-gray-700 text-sm font-bold mb-2" htmlFor="product-name">
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-cod-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="product-name"
              type="text"
              placeholder="Product Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-cod-gray-700 text-sm font-bold mb-2" htmlFor="company-name">
              Company Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-cod-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company-name"
              type="text"
              placeholder="Company Name"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-cod-gray-700 hover:bg-cod-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
