export const desigations = [
    {
        id: 1,
        name: 'SDE-1',
        value: 'software_engineer_1'
    },
    {
        id: 2,
        name: 'SDE-2',
        value: 'software_engineer_2'
    },
    {
        id: 3,
        name: 'SDE-3',
        value: 'software_engineer_3'
    },
    {
        id: 4,
        name: 'Project Manager',
        value: 'project_manager'
    },
    {
        id: 5,
        name: 'Program Manager',
        value: 'program_manager'
    },
    {
        id: 6,
        name: 'Engineering Lead',
        value: 'engineering_lead'
    },
    {
        id: 7,
        name: 'UI/UX Designer',
        value: 'ui_ux_designer'
    },
    {
        id: 8,
        name: 'Product Head',
        value: 'product_head'
    },
    {
        id: 9,
        name: 'Design Engineer',
        value: 'design_engineer'
    },
    {
        id: 10,
        name: 'Data Analyst',
        value: 'data_analyst'
    },
    {
        id: 11,
        name: 'Business Analyst',
        value: 'business_analyst'
    },
    {
        id: 12,
        name: 'Associate Software Engineer',
        value: 'associate_software_engineer'
    },
    {
        id: 13,
        name: 'Senior Software Engineer',
        value: 'senior_software_engineer'
    }
]

export const designationMap = new Map();
designationMap.set('software_engineer_1', 'SDE-1');
designationMap.set('software_engineer_2', 'SDE-2');
designationMap.set('software_engineer_3', 'SDE-3');
designationMap.set('project_manager', 'Project Manager');
designationMap.set('program_manager', 'Program Manager');
designationMap.set('engineering_lead', 'Engineering Lead');
designationMap.set('ui_ux_designer', 'UI/UX Designer');
designationMap.set('product_head', 'Product Manager');
designationMap.set('design_engineer', 'Design Engineer');
designationMap.set('data_analyst', 'Data Analyst');
designationMap.set('business_analyst', 'Business Analyst');
designationMap.set('associate_software_engineer', 'ASE');
designationMap.set('senior_software_engineer', 'SSE');

export const statusOptions = [
    {
      name: 'Status Pending',
      value: 'pending'
    },
    {
      name: 'Design Phase',
      value: 'design'
    },
    {
      name: 'Development',
      value: 'development'
    },
    {
      name: 'Alpha Testing',
      value: 'alpha_testing'
    },
    {
      name: 'Beta Testing',
      value: 'beta_testing'
    },
    {
      name: 'Pre Release',
      value: 'pre_release',
    },
    {
      name: 'Released on Staging',
      value: 'staging'
    },
    {
      name: 'Pushed to Production',
      value: 'production',
    },
    {
      name: 'Closed',
      value: 'closed',
    }
  ]

  
  const colorMap = new Map();
  colorMap.set('pending',['gray','#fff']);
  colorMap.set('design',['pink','#fff']);
  colorMap.set('development',['#1976d2','#fff']);
  colorMap.set('alpha_testing',['#d10023','#fff']);
  colorMap.set('beta_testing',['brown','#fff']);
  colorMap.set('pre_release',['violet','#fff']);
  colorMap.set('staging',['orange','#fff']);
  colorMap.set('production',['#000','#fff']);
  colorMap.set('closed',['green','#fff']);


const adminSteps = ['Create your Account', 'Create a new project', 'Assign users to project', 'Check progress'];
const adminStepMap = new Map();

adminStepMap.set(1, "First create your admin account with the permission of the system administrator of the company. You will then gain the authority to manage users.");
adminStepMap.set(2, "Using our dynamic and interactive forms, you can create a Project for your team, as well as select the stack required for the project.");
adminStepMap.set(3, "Assign work to the employees in your firm efficiently with our management system.");
adminStepMap.set(4, "The upcoming dashboard will allow you to track the progress of your project as and when the employees update their status.");

const userSteps = ['Create your Account', 'Receive assigned work', 'Notify status of the project to admin', 'Raise Issues'];
const userStepMap = new Map();

userStepMap.set(1, "First create your account under a given administrator.");
userStepMap.set(2, "Access the projects that have been assigned to you. If you haven't received a project yet, contact your admin.");
userStepMap.set(3, "When you work on the project, you can notify the administrator as well as the other users in your team about the status of the project.");
userStepMap.set(4, "Whenever faced with trouble or errors, you can always go to the issues section and raise issues for the team to see them and resolve them.");

export {userSteps,userStepMap,adminSteps,adminStepMap,colorMap};

