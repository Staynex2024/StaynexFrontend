import { Avatar, Box, LinearProgress, Typography } from "@mui/material";
import Template from "../components/Template";
import { useState } from "react";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { profileTab } from "../constant/profile";
import ProfilePass from "../AppComponents/profile/ProfilePass";
import ProfileRedeem from "../AppComponents/profile/ProfileRedeem";
import ProfileAccount from "../AppComponents/profile/ProfileAccount";

const Profile = () => {
  const [switchTabs, setSwitchTabs] = useState(1);

  return (
    <Template>
      <Box>
        <Box
          sx={{
            background: "#fceeea",
            padding: { xs: "20px", sm: "30px 40px" },
            flexDirection: { xs: "column", sm: "row" },
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="20px"
        >
          <Box
            display="flex"
            alignItems="center"
            gap="20px"
            sx={{
              flex: 1,
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Avatar
              src="/assets/profile1.jpg"
              sx={{ width: "50px", height: "50px" }}
            />
            <Box>
              <Typography fontSize="18px" fontWeight="700">Bruno Fernandez</Typography>
              <Box display="flex" alignItems="center" gap="10px">
                <AccountBalanceWalletOutlinedIcon />
                <Typography fontWeight="500">0xb794f5ea...9579268</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography color="orange.main" fontWeight="700" variant="h6">
                Explorer
              </Typography>
              <Typography fontWeight="500" color="gray.main">
                <span style={{ color: "#000" }}>180</span>/365{" "}
                <small>Nights</small>
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={50}
                color="orange"
                sx={{ borderRadius: "5px", height: "7px" }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Typography color="gray.main">NEXT tier: GLOBETROTTER</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{padding: {xs: '0 10px', sm: '0 10%'}}} >
          <Box display="flex" alignItems="center" gap="30px">
            {profileTab.map((tab) => (
              <div
                key={tab.id}
                style={{
                  padding: "5px",
                  fontWeight: "500",
                  marginTop: "10px",
                  cursor: "pointer",
                  borderBottom: `${
                    switchTabs === tab.id ? "3px solid #E55735" : ""
                  }`,
                }}
                onClick={() => setSwitchTabs(tab.id)}
              >
                {tab.name}
              </div>
            ))}
          </Box>
          {switchTabs === 1 && <ProfilePass />}
          {switchTabs === 2 && <ProfileRedeem />}
          {switchTabs === 3 && <ProfileAccount />}
        </Box>
      </Box>
    </Template>
  );
};

export default Profile;
