import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openTaskDialog } from "../../../../redux/reducers/dialogSlice";
import { NavLink } from "react-router-dom";

export const NavigationItems: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const openAddTaskDialog = () => {
    dispatch(openTaskDialog());
  };

  return (
    <List>
      <ListItemButton onClick={openAddTaskDialog}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t("tasks.add")} />
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/inbox"
        sx={{ "&.active": { color: "primary.main" } }}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={t("nav.inbox")} />
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/upcoming"
        sx={{ "&.active": { color: "primary.main" } }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={t("nav.upcoming")} />
      </ListItemButton>
    </List>
  );
};
