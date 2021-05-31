import StoryCard from "./StoryCard";

const stories = [
  {
    name: "Anmol Sethi",
    src: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3889025321210082&height=50&width=50&ext=1624910682&hash=AeT66ovkQ83makQiXo8",
    profile:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3889025321210082&height=50&width=50&ext=1624910682&hash=AeT66ovkQ83makQiXo8",
  },
  {
    name: "Elon Musk",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Jeff Bezos",
    src: "https://links.papareact.com/k2j",
    profile: "https://links.papareact.com/f0p",
  },
  {
    name: "Mark Zukerburg",
    src: "https://links.papareact.com/xql",
    profile: "https://links.papareact.com/snf",
  },
  {
    name: "Bill Gates",
    src: "https://links.papareact.com/4u4",
    profile: "https://links.papareact.com/zvy",
  },
];

export default function Stories() {
  return (
    <div className="flex justify-center mx-auto space-x-3">
      {stories.map((story) => (
        <StoryCard
          key={story.src}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
}
