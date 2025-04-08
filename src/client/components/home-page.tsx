import { TimerForm } from "./timer-form";

import { LuExternalLink } from "react-icons/lu";

export function HomePage() {
  return (
    <main role="main" className="prose flex flex-col p-8">
      <h1 className="text-neutral-200">Get ready to work!</h1>
      <div className="flex items-center">
        <div>
          <img
            className="animate-fancy-in hidden sm:block"
            alt="adorable axolotl"
            src="/mascot-medium.png"
            width="600"
            height="409"
          />
        </div>
        <div className="max-w-md">
          <TimerForm />
        </div>
      </div>
      <p className="border-l-2 border-solid border-l-white pl-2 text-justify text-neutral-200">
        Tip: After starting the timer, share the page{"'"}s URL to synchronize
        with your friends.
        <br />
      </p>
      <p className="text-justify text-neutral-200">
        Be guided alongside others through short sprints of work and rest by our
        minimalist visual timer. Best of all? It works offline and will always
        be free and open source!
      </p>
      <p className="flex gap-2">
        <a
          href={"https://github.com/sponsors/axolotl-logic"}
          className="flex text-blue-400 underline hover:cursor-pointer hover:text-purple-400"
          target="_blank"
        >
          Donate
          <LuExternalLink className="size-3" />
        </a>
        {"to help sustain us."}
      </p>
    </main>
  );
}
