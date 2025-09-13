import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import type { User } from "../../typeModule";

const Profile: React.FC = () => {
  const user: User | null = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="textSecondary">
          Loading user profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f3f4f6"
      p={2}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: { xs: "90%", sm: "400px" },
          borderRadius: 3,
          textAlign: "center",
          background: "linear-gradient(to bottom right, #ffffff, #e0e7ff)",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 3,
            bgcolor: "#6366f1",
            fontSize: 40,
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          {user.username}
        </Typography>

        <Box mb={2} textAlign="left">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="textSecondary"
          >
            Email
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>

        <Box mb={2} textAlign="left">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="textSecondary"
          >
            Role
          </Typography>
          <Typography variant="body1">{user.roleName}</Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="body2" color="textSecondary">
            You can update your profile information in your account settings.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
