import * as cdk from 'aws-cdk-lib';
import { StaticTodoSiteStack } from '../lib/static-todo-site-stack.ts';

const app = new cdk.App();

new StaticTodoSiteStack(app, 'StaticTodoSiteStack', {
  description: 'S3 static website hosting for the React ToDo app',
});
