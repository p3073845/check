import { useEffect, useRef, useState } from "react";
const BootstrapDropDown = ({
  options,
  value,
  onChange,
  placeholder,
  isLoading,
  onMenuOpen,
  isClearable = true,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const containerRef = useRef(null);

  // Filter options based on search term
  useEffect(() => {
    if (options && options.length > 0) {
      const filtered = options.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [options, searchTerm]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Call onMenuOpen when dropdown is opened
  useEffect(() => {
    if (isOpen && onMenuOpen) {
      onMenuOpen();
    }
  }, [isOpen, onMenuOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (isClearable) {
      onChange(null);
    }
  };

  return (
    <div
      className="position-relative"
      ref={containerRef}
      style={{
        zIndex: isOpen ? 1050 : 1,
      }}
    >
      
      <div className="input-group">
        {isOpen ? (
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            id={id}
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "white" }}
          />
        ) : (
          <input
            type="text"
            className="form-control pr-4"
            placeholder={placeholder}
            value={value ? value.label : ""}
            readOnly
            onClick={toggleDropdown}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
            }}
            id={id}
          />
        )}

        {!isOpen && value && isClearable && (
          <div
            className="position-absolute"
            onClick={handleClear}
            style={{
              right: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 4,
              padding: "0 8px",
            }}
          >
            <i className="mdi mdi-close" style={{ fontSize: "14px" }}></i>
          </div>
        )}

        <div className="input-group-append" onClick={toggleDropdown}>
          <span className="input-group-text" style={{ cursor: "pointer" }}>
            <i className={`mdi mdi-chevron-${isOpen ? "up" : "down"}`}></i>
          </span>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="dropdown-menu show w-100"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1050,
            display: "block",
            padding: 0,
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            boxShadow: "0 6px 12px rgba(0,0,0,.175)",
            // Add containment to prevent overlap with other page elements
            containment: "strict",
          }}
        >
          {isLoading ? (
            <div className="dropdown-item text-center">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <span className="ml-2">Loading...</span>
            </div>
          ) : filteredOptions.length > 0 ? (
            <>
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick(option)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      value && value.value === option.value ? "#D7E2F6" : "",
                  }}
                >
                  {option.label}
                </div>
              ))}
            </>
          ) : (
            <div className="dropdown-item text-muted">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BootstrapDropDown;
