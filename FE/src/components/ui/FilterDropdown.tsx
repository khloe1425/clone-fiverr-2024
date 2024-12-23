type FilterDropdownProps = {
  label: string;
  options: { label: string; count?: number }[];
};

export const FilterDropdown = ({ label, options }: FilterDropdownProps) => {
  return (
    <div className="categories-topbar-dropdown-filter">
      <button className="dropdown-toggle" data-bs-toggle="dropdown">
        {label}
        <span>
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z"></path>
          </svg>
        </span>
      </button>
      <ul className="dropdown-menu">
        {options.map((option, index) => (
          <li key={index} className="d-flex align-items-center">
            <a href="#a" className="dropdown-item">
              {option.label}
            </a>
            {option.count && <span>({option.count})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
