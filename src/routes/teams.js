const express = require('express');
const Team = require('../models/Team');

const router = express.Router();

// Create team
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'Team name required' });
    }

    const team = await Team.create({
      name,
      description,
      createdBy: userId
    });

    await Team.addMember(team.id, userId, 'owner');

    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    console.error('Team creation error:', error);
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// Get user teams
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const teams = await Team.getUserTeams(userId);
    res.json(teams);
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get team details
router.get('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.getById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Get team members
router.get('/:teamId/members', async (req, res) => {
  try {
    const { teamId } = req.params;
    const members = await Team.getMembers(teamId);
    res.json(members);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Add member to team
router.post('/:teamId/members', async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId, role } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const member = await Team.addMember(teamId, userId, role || 'member');
    res.status(201).json({ message: 'Member added to team', member });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// Remove member from team
router.delete('/:teamId/members/:userId', async (req, res) => {
  try {
    const { teamId, userId } = req.params;
    await Team.removeMember(teamId, userId);
    res.json({ message: 'Member removed from team' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

module.exports = router;