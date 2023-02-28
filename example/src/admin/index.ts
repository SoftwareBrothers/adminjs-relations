import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { Express } from 'express';

import { componentLoader } from './component-loader';
import datasource from './db/config';
import {
  createOrganizationResource,
  createPersonResource,
} from './db/resources';

const setupAdmin = async (app: Express): Promise<void> => {
  await datasource.initialize();

  AdminJS.registerAdapter({ Database, Resource });

  const adminJs = new AdminJS({
    resources: [createOrganizationResource(), createPersonResource()],
    componentLoader,
    rootPath: '/',
  });

  const router = await AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

export default setupAdmin;
