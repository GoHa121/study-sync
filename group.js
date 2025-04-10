// File: server/routes/group.js
const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');

// Tạo nhóm học
router.post('/create', async (req, res) => {
  try {
    const { groupName, description, members } = req.body;
    const newGroup = new Group({
      groupName,
      description,
      members, // members là mảng các ID người dùng
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: 'Error creating group' });
  }
});

// Cập nhật nhóm học
router.put('/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.groupName = req.body.groupName || group.groupName;
    group.description = req.body.description || group.description;

    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Error updating group' });
  }
});

// Xóa nhóm học
router.delete('/:groupId', async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting group' });
  }
});

// Lấy tất cả nhóm của người dùng
router.get('/user/:userId', async (req, res) => {
  try {
    const groups = await Group.find({ members: req.params.userId });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching groups' });
  }
});

module.exports = router;
