// File: client/src/pages/GroupPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ groupName: '', description: '', members: [] });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/groups/user/${userId}`);
      setGroups(response.data);
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const groupData = { ...newGroup, members: [userId] };
    try {
      const response = await axios.post('/api/groups/create', groupData);
      setGroups([...groups, response.data]);
      setNewGroup({ groupName: '', description: '', members: [] });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating group', error);
    }
  };

  return (
    <div className="group-page">
      <h1>Your Study Groups</h1>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancel' : 'Create New Group'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateGroup}>
          <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            value={newGroup.groupName}
            onChange={(e) => setNewGroup({ ...newGroup, groupName: e.target.value })}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            required
          ></textarea>
          <button type="submit">Create Group</button>
        </form>
      )}

      <div className="group-list">
        {groups.length === 0 ? (
          <p>No groups found. Create one!</p>
        ) : (
          groups.map((group) => (
            <div key={group._id} className="group-card">
              <h3>{group.groupName}</h3>
              <p>{group.description}</p>
              <button onClick={() => navigate(`/group/${group._id}`)}>View Group</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupPage;
