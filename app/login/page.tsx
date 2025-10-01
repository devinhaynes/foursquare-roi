import Image from "next/image";
import logo from "../../public/logo-color.svg";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="grid place-content-center w-full min-h-screen">
      <form className="flex flex-col gap-y-4 p-20 pt-10 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
        <div className="mb-4 flex flex-col gap-2 items-center border-b border-b-zinc-300 dark:border-b-zinc-800 pb-2">
          <Image src={logo} alt="FourSquare ROI" width={60} height={60} />
          <h1 className="text-lg font-semibold uppercase">
            Sign in to FourSquare
          </h1>
        </div>

        <div className="flex flex-col-reverse gap-1 w-max">
          <div className="peer flex flex-wrap-reverse gap-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="bg-zinc-100 dark:bg-zinc-900 outline-1 outline-zinc-300 dark:outline-zinc-800 px-3 py-1 rounded-lg text-xl"
            />
          </div>
          <div className="flex flex-wrap justify-between">
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-1 w-max">
          <div className="peer flex flex-wrap-reverse gap-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="bg-zinc-100 dark:bg-zinc-900 outline-1 outline-zinc-300 dark:outline-zinc-800 px-3 py-1 rounded-lg text-xl"
            />
          </div>
          <div className="flex flex-wrap justify-between">
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg dark:bg-zinc-950"
            formAction={login}
          >
            Log in
          </button>
          <button
            className="px-3 py-1 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg dark:bg-zinc-950"
            formAction={signup}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
