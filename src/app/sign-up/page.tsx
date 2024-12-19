"use client"
import NavBar from "@/components/NavBar";
import Helpers from "@/config/Helpers";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function page() {
  const router = useRouter();

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    axios.post(`${Helpers.apiUrl}sign-up`, { name, email, password }, { headers })
      .then((response) => {
        console.log(response)
        toast.success(response.data.message)
        router.push('/');
      })
      .catch((error) => {
        console.log(error)
        const message = error?.response?.data?.message || "An error occurred";
        toast.error(message);
      });
  }

  return (
    <div >
      <NavBar />
      <div className="w-full h-[100vh] max-h-screen flex items-center justify-center">

        <div className="w-full max-w-lg p-10 bg-white border  rounded-3xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-700">Sign Up</h2>
          <form onSubmit={submitHandler} className="mt-6 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input type="name" id="name" name="email"
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-100 border rounded-xl focus:outline-none focus:ring focus:ring-black"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" id="email" name="email"
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-100 border rounded-xl focus:outline-none focus:ring focus:ring-black"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input type="password" id="password" name="password"
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-100 border rounded-xl focus:outline-none focus:ring focus:ring-black"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button type="submit"
                className="w-full px-4 py-3 text-white bg-black rounded-xl  focus:outline-none focus:ring focus:ring-black">
                Sign Up
              </button>
            </div>
            <div className="text-center text-gray-600 ">
              if you have an account? <Link href="/" className="font-bold">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
