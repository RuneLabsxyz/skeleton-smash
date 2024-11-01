export function load({ params }: { params: { slug: string } }) {
    return {
      runId: params.slug,
    }
  }
  