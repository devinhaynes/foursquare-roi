export const Header = () => {
  return (
    <div className="flex justify-between w-full max-w-[100em] mx-auto p-2 border-b-[1px] border-b-gray-100">
      <div>Logo</div>
      <div className="flex-1">
        <nav className="justify-self-end">
          <ul className="flex gap-2">
            <li>Home</li>
            <li>Calc</li>
            <li>Account</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
