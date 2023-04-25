interface Props {}

export default function SubmitButton({}: Props) {
  return (
    <button
      className="focus-ring mt-6 box-border w-full rounded-md bg-primary px-4 py-2 text-center text-base text-white hover:animate-pulse focus-visible:ring-0"
      type="submit"
    >
      Submit
    </button>
  );
}
