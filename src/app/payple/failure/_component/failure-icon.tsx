export default function FailureIcon() {
  return (
    <div className="mb-2 rounded-full bg-red-50 p-4">
      <svg
        className="h-10 w-10 text-red-600"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          className="stroke-current"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <path
          d="M15 9L9 15M9 9l6 6"
          className="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
