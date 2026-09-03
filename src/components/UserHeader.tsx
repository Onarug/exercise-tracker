import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";
import { getStats } from "../api/user";
import type { StatsResponse } from "../types";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const UserHeader = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStats();
        setStats(response);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchData();
  }, []);

  const SubmitLogout = async () => {
    try {
      await logout();
      navigate(`/`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="user-page-header-text">Welcome {user?.name}</h1>
      
      <div className="stat-container">
        <div className="stat-box">
          
          <h1>Total Workouts: </h1> 
          <p>{stats?.totalWorkouts}</p>
        </div>
        <div className="stat-box">
          
          <h1> Last Workout: </h1>
          <p>{stats?.lastName}</p>
        </div>
        <div className="stat-box">
         
          <h1>Total Weight Moved:</h1>
          <p> {stats?.totalWeightLb} Lbs</p>
        </div>
      </div>

      <div className="user-page-container">
        <div>
          <button
            className="login-button"
            onClick={() => console.log("Add workout btn")}
          >
    
            Add workout
          </button>
        </div>
        <div>
          <button className="login-button" onClick={SubmitLogout}>
            
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
