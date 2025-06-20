
import { router } from '@/router';
import PageContent from '@/components/PageContent';
import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod';
import { notFound } from 'next/navigation';

export default async function Page() {
  if (process.env.NODE_ENV !== 'development') notFound();

  const generator = new OpenAPIGenerator({
    schemaConverters: [
      new ZodToJsonSchemaConverter()
    ],
  })

  const spec = await generator.generate(router, {
    info: {
      title: 'Blog API',
      version: '1.0.0'
    },
  })

  return <PageContent spec={spec} />;
}
