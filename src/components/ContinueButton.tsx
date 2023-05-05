import Link from "next/link";

export const ContinueButton = (props: { location: string; text: string }) => {
  return (
    <Link href={props.location} className="btn-accent btn w-full rounded-full">
      {props.text}
    </Link>
  );
};
