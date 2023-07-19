import ConnectButton from "./ConnectButton";

const Nav = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Transfer you crypto</a>
      </div>
      <ConnectButton />
    </div>
  );
};

export default Nav;
