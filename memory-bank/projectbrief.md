We are developing the UI for the platform admin of the Remodel AI platform, which in part incorporates the functionality of the FlowWise low-code agentic AI development platform—and will closely tie into how that works. We have extended the core FlowWise functionality leveraging Supabase to enable multi-application, multi-organization, multi-tenant, multi-user functionality—so that we can deploy multiple applications all leveraging the same backend infrastructure including FlowWise.

<ScopeOfImmediateCodebase>
The immediate code base that we are working on is the UI for the platform admin application. This allows for the management across the entire platform, including multiple data sources—all of which, in a production environment, are routed through the API gateway. In a development environment, they may be routed directly to the backend server during testing. 

This UI should allow for a comprehensive, clean and easy management of all aspects of the platform itself, including the following:
1. Overall platform administration, 
2. Application CRUD and general management
3. Organization (tenant) CRUD and management
4. User CRUD and management
5. Management of the various parts of the system, including
  -  Data in various databases (supabase, neo4j, pinecone etc.)
  -  Memory systems and structures for the agents
  -  Document storage and management
  -  Enabling/disabling of various modules and featrues
  -  Feature addition
  -  analytics, etc.


</ScopeOfImmediateCodebase>

<PlatformStructureHierarchy>
The data structure of the platform is generally as follows:
1. Platform - top level admin
2. Application - a given application developed on the platform (public.applications in the supabase schema)
  - Specific chatlflows and agentflows belong to a given application, and can be copied/shared across applications
3. Organizations - tenants of a given application (public.organizations)
4. Users - Members of a given Organization. The first member of an organization is granted organization_admin role

</PlatformStructureHierarchy>

