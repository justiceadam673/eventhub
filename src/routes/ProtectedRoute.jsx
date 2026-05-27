import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      // Get user role from Firestore (STRICT CHECK)
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      setRole(userData.role);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 font-bold'>Verifying access...</p>
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  // ❌ Role mismatch (STRICT SECURITY)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};

export default ProtectedRoute;
