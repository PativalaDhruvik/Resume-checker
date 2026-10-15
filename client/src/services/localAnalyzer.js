/**
 * Client-side ATS Analyzer Fallback Engine for Live Demo Uptime
 * Guarantees zero downtime if backend server is sleeping or unreachable
 */
export const runLocalAnalysis = async ({ file, targetRole = 'Senior Full Stack Developer', jobDescription = '', resumeText = '' }) => {
  let textToScan = resumeText ? resumeText.trim() : '';

  if (file && !textToScan) {
    try {
      textToScan = await file.text();
    } catch (e) {
      return {
        success: false,
        message: 'Could not extract text from the uploaded file. Please paste your resume text directly.',
      };
    }
  }

  if (!textToScan || textToScan.trim().length === 0) {
    return {
      success: false,
      message: 'Please upload a resume file (PDF, DOCX, TXT) or paste resume text before checking the ATS score.',
    };
  }

  const lowerText = textToScan.toLowerCase();
  const lowerTarget = targetRole.toLowerCase();

  const allKeywords = [
    { kw: 'react', cat: 'Frontend', roles: ['frontend', 'full stack', 'web', 'javascript'] },
    { kw: 'vue', cat: 'Frontend', roles: ['frontend', 'full stack', 'web'] },
    { kw: 'angular', cat: 'Frontend', roles: ['frontend', 'full stack'] },
    { kw: 'typescript', cat: 'Languages', roles: ['frontend', 'backend', 'full stack', 'software'] },
    { kw: 'javascript', cat: 'Languages', roles: ['frontend', 'full stack', 'web', 'software'] },
    { kw: 'node.js', cat: 'Backend', roles: ['backend', 'full stack', 'software'] },
    { kw: 'express', cat: 'Backend', roles: ['backend', 'full stack'] },
    { kw: 'python', cat: 'Backend / Data', roles: ['backend', 'data', 'software', 'ai', 'ml'] },
    { kw: 'java', cat: 'Backend', roles: ['backend', 'software', 'enterprise'] },
    { kw: 'rest api', cat: 'Architecture', roles: ['backend', 'full stack', 'frontend', 'software'] },
    { kw: 'rest apis', cat: 'Architecture', roles: ['backend', 'full stack', 'frontend', 'software'] },
    { kw: 'graphql', cat: 'Architecture', roles: ['backend', 'full stack', 'frontend'] },
    { kw: 'mongodb', cat: 'Database', roles: ['backend', 'full stack', 'database'] },
    { kw: 'postgresql', cat: 'Database', roles: ['backend', 'full stack', 'database', 'data'] },
    { kw: 'sql', cat: 'Database', roles: ['backend', 'full stack', 'database', 'data'] },
    { kw: 'docker', cat: 'DevOps', roles: ['devops', 'backend', 'full stack', 'software'] },
    { kw: 'kubernetes', cat: 'DevOps', roles: ['devops', 'backend', 'cloud'] },
    { kw: 'aws', cat: 'Cloud', roles: ['cloud', 'devops', 'backend', 'full stack'] },
    { kw: 'git', cat: 'Version Control', roles: ['software', 'frontend', 'backend', 'full stack'] },
    { kw: 'ci/cd', cat: 'DevOps', roles: ['devops', 'backend', 'full stack', 'software'] },
    { kw: 'tailwind', cat: 'Frontend', roles: ['frontend', 'full stack', 'web'] },
    { kw: 'microservices', cat: 'Architecture', roles: ['backend', 'full stack', 'software'] },
    { kw: 'agile', cat: 'Process', roles: ['software', 'product', 'manager', 'full stack', 'frontend', 'backend'] },
  ];

  const relevantPool = allKeywords.filter(
    (k) => k.roles.some((r) => lowerTarget.includes(r)) || ['git', 'agile', 'rest api', 'docker'].includes(k.kw)
  );

  const matched = [];
  const missing = [];
  const poolToUse = relevantPool.length >= 8 ? relevantPool : allKeywords.slice(0, 16);

  poolToUse.forEach(({ kw, cat }) => {
    if (lowerText.includes(kw)) {
      matched.push({
        keyword: kw.toUpperCase(),
        category: cat,
        marketDemand: Math.floor(Math.random() * 25 + 20) + '%',
      });
    } else {
      missing.push({
        keyword: kw.toUpperCase(),
        importance: ['react', 'node.js', 'typescript', 'docker', 'python', 'aws', 'rest api'].includes(kw) ? 'High' : 'Medium',
        recommendation: `Include ${kw.toUpperCase()} in your skills or experience section to match ${targetRole} requirements.`,
        marketDemand: Math.floor(Math.random() * 20 + 18) + '%',
      });
    }
  });

  // Dynamic Structure & Formatting Assessment
  const sectionKeywords = ['experience', 'work history', 'employment', 'education', 'degree', 'university', 'skills', 'projects', 'summary'];
  let sectionsFound = 0;
  sectionKeywords.forEach((sec) => {
    if (lowerText.includes(sec)) sectionsFound += 1;
  });

  const hasContactInfo = /(@|\.com|\+?\d{10,}|github|linkedin)/i.test(textToScan);
  const formattingScore = Math.min(96, Math.max(52, 60 + (sectionsFound * 5) + (hasContactInfo ? 8 : 0)));

  // Dynamic Keyword Score
  const matchRatio = matched.length / Math.max(matched.length + missing.length, 1);
  const keywordScore = Math.min(96, Math.max(45, Math.round(40 + (matchRatio * 56))));

  // Dynamic Quantitative Metrics Assessment (exclude bare 4-digit years)
  const metricMatches = (textToScan.match(/\b(?!19\d\d|20\d\d)\d+(\.\d+)?(%|k|K|m|M|x|ms|\+|k\+)?\b/g) || []).filter(n => n.trim().length > 0).length;
  const impactScore = Math.min(95, Math.max(48, 52 + Math.min(metricMatches * 6, 42)));

  // Dynamic Clarity Assessment
  const actionVerbs = ['developed', 'engineered', 'architected', 'led', 'designed', 'built', 'improved', 'created', 'managed', 'reduced', 'increased', 'optimized', 'delivered', 'automated'];
  let actionVerbsFound = 0;
  actionVerbs.forEach((v) => {
    if (lowerText.includes(v)) actionVerbsFound += 1;
  });

  const wordCount = textToScan.trim().split(/\s+/).length;
  const lengthBonus = wordCount >= 100 && wordCount <= 900 ? 10 : wordCount < 50 ? -15 : 0;
  const clarityScore = Math.min(95, Math.max(48, 54 + (actionVerbsFound * 4) + lengthBonus));

  // Weighted ATS Score
  const atsScore = Math.round(
    (formattingScore * 0.25) +
    (keywordScore * 0.35) +
    (impactScore * 0.25) +
    (clarityScore * 0.15)
  );

  let statusBadge = 'Strong ATS Compatibility';
  if (atsScore >= 85) statusBadge = 'Excellent ATS Match';
  else if (atsScore >= 75) statusBadge = 'Great ATS Compatibility';
  else if (atsScore >= 65) statusBadge = 'Good Potential - Minor Gaps';
  else statusBadge = 'Needs Optimization';

  const actionableIssues = [];
  if (metricMatches < 3) {
    actionableIssues.push({
      id: 'iss-metrics',
      severity: 'critical',
      title: 'Limited quantitative metrics found in Work Experience',
      description: 'ATS parsers and recruiters prioritize resumes with measurable results (%, latency, active users).',
      recommendation: 'Incorporate quantifiable outcomes like "Improved API latency by 35%" or "Managed team of 6 engineers".',
      suggestedFix: 'Quantify your responsibilities and achievements in bullet points with real metrics.',
    });
  }

  if (missing.length > 2) {
    actionableIssues.push({
      id: 'iss-keywords',
      severity: 'warning',
      title: `Missing target role skills for ${targetRole}`,
      description: `Your resume is missing skills (${missing.slice(0, 3).map((m) => m.keyword).join(', ')}) commonly scanned for this role.`,
      recommendation: `Add highlighted missing keywords into your experience bullet points or skills summary.`,
      suggestedFix: `Incorporate ${missing.slice(0, 2).map((m) => m.keyword).join(' and ')} directly into your project descriptions.`,
    });
  }

  if (sectionsFound < 3) {
    actionableIssues.push({
      id: 'iss-layout',
      severity: 'warning',
      title: 'Missing traditional resume section headers',
      description: 'Ensure standard headers like "Work Experience", "Education", and "Technical Skills" are clear.',
      recommendation: 'Use clean standard headers so ATS resume parsers categorize your sections with 100% accuracy.',
      suggestedFix: 'Rename custom headers to standard ATS compliant naming conventions.',
    });
  }

  const bulletDiffs = [
    {
      id: 'diff-1',
      section: 'Work Experience',
      original: 'Worked on backend REST APIs and database queries for web application.',
      aiImproved: `Architected high-throughput ${matched[0]?.keyword || 'Node.js'} REST APIs and optimized database indexes, reducing response latency by 35% across 150k monthly requests.`,
      impactScoreIncrease: '+35% Impact',
      improvementsMade: ['Added 35% latency reduction metric', 'Highlighted architecture verb "Architected"', 'Specified volume scale'],
    },
    {
      id: 'diff-2',
      section: 'Frontend / Projects',
      original: 'Built user interface components and resolved bugs.',
      aiImproved: `Engineered responsive, accessible UI modules using ${matched[1]?.keyword || 'React'}, boosting user interaction rates by 26% and cutting customer bug reports in half.`,
      impactScoreIncrease: '+28% Impact',
      improvementsMade: ['Added quantifiable engagement gain', 'Emphasized accessibility standards', 'Used strong action verb "Engineered"'],
    },
  ];

  return {
    success: true,
    data: {
      _id: 'client-' + Date.now(),
      createdAt: new Date().toISOString(),
      fileName: file ? file.name : 'Pasted_Resume.txt',
      fileSize: file ? `${(file.size / 1024).toFixed(1)} KB` : '12 KB',
      targetRole,
      jobDescription: jobDescription || '',
      atsScore,
      statusBadge,
      categoryMetrics: {
        formatting: formattingScore,
        keywordMatch: keywordScore,
        impactMetrics: impactScore,
        clarity: clarityScore,
      },
      matchedKeywords: matched.slice(0, 10),
      missingKeywords: missing.slice(0, 6),
      actionableIssues,
      bulletDiffs,
      summaryFeedback: `Resume scanned against ${targetRole}. Deterministic ATS score of ${atsScore}/100 indicates ${statusBadge.toLowerCase()}.`,
    },
  };
};

function getCategoryForKeyword(kw) {
  if (['react', 'tailwind', 'typescript', 'javascript'].includes(kw)) return 'Frontend';
  if (['node.js', 'express', 'python', 'rest api', 'microservices'].includes(kw)) return 'Backend';
  if (['mongodb', 'sql', 'redis'].includes(kw)) return 'Database';
  if (['docker', 'aws', 'ci/cd', 'git', 'kubernetes'].includes(kw)) return 'DevOps & Tools';
  return 'Core Competency';
}
