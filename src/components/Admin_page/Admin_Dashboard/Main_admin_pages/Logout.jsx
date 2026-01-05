import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmLogoutModal  from '../Main_admin_pages/ConfirmLogoutModal'


const Logout = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // ✅ open immediately

  const handleConfirm = () => {
    // clear auth
    localStorage.clear();

    // redirect to login
    navigate("/", { replace: true });
  };
  return (
    <ConfirmLogoutModal
      open={open}
      onConfirm={handleConfirm}
      onCancel={() => navigate(-1)}
    />
  )
}

export default Logout

