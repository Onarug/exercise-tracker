import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";
import { getStats } from "../api/user";
import type { StatsResponse } from "../types";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { NewWorkoutContainer } from "./NewWorkoutContainer";

export const UserHeader = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [newWorkout, setNewWorkout] = useState(false)
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
          
          <h3>Total Workouts: </h3> 
          <p>{stats? stats.totalWorkouts : 0}</p>
        </div>
        <div className="stat-box">
          
          <h3> Last Workout: </h3>
          <p>{stats? stats.lastName : "N/a"}</p>
        </div>
        <div className="stat-box">
         
          <h3>Total Weight Moved:</h3>
          <p> {stats? stats.totalWeightLb : 0} Lbs</p>
        </div>
      </div>

      <div className="user-page-container">
        <div>
          <button
            className="login-button"
            onClick={() => setNewWorkout(!newWorkout)}
          >
    
            {!newWorkout ? "Add Workout"   : "Close" }
          </button>
        </div>
        <div>
          <button className="login-button" onClick={SubmitLogout}>
            
            Logout
          </button>
        </div>
      </div>
      {newWorkout ? <NewWorkoutContainer /> : <div></div>}
    </div>
  );
};
