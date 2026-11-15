<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Finder\Finder;

class SyncMediaToR2 extends Command
{
    protected $signature = 'media:sync-r2 {--force : Overwrite existing files on R2}';
    protected $description = 'Sync local media assets to Cloudflare R2 bucket';

    public function handle()
    {
        $this->info('Starting sync of media files to Cloudflare R2 (https://cdn.xorazm-tour.uz)...');

        $disk = Storage::disk('s3');
        $force = $this->option('force');

        $directories = [
            'storage/app/public' => base_path('storage/app/public'),
            'public/XT_content' => public_path('XT_content'),
        ];

        $filesToUpload = [];

        // 1. Files in storage/app/public
        if (is_dir($directories['storage/app/public'])) {
            $finder = new Finder();
            $finder->files()->in($directories['storage/app/public'])->notName('.gitignore');
            foreach ($finder as $file) {
                $relativePath = str_replace($directories['storage/app/public'] . '/', '', $file->getRealPath());
                $filesToUpload[$relativePath] = $file->getRealPath();
            }
        }

        // 2. Files in public/XT_content (upload under XT_content/ prefix)
        if (is_dir($directories['public/XT_content'])) {
            $finder = new Finder();
            $finder->files()->in($directories['public/XT_content'])->notName('.gitignore');
            foreach ($finder as $file) {
                $subPath = str_replace($directories['public/XT_content'] . '/', '', $file->getRealPath());
                $relativePath = 'XT_content/' . $subPath;
                $filesToUpload[$relativePath] = $file->getRealPath();
            }
        }

        $total = count($filesToUpload);
        $this->info("Found {$total} media files to verify/sync.");

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $uploaded = 0;
        $skipped = 0;
        $failed = 0;

        foreach ($filesToUpload as $targetPath => $sourcePath) {
            try {
                if (!$force && $disk->exists($targetPath)) {
                    $skipped++;
                } else {
                    $stream = fopen($sourcePath, 'r');
                    $disk->put($targetPath, $stream, [
                        'visibility' => 'public',
                        'ContentType' => mime_content_type($sourcePath) ?: 'application/octet-stream',
                        'CacheControl' => 'public, max-age=31536000, immutable',
                    ]);
                    if (is_resource($stream)) {
                        fclose($stream);
                    }
                    $uploaded++;
                }
            } catch (\Throwable $e) {
                $failed++;
                $this->error("\nFailed to upload {$targetPath}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("Sync completed! Uploaded: {$uploaded}, Skipped: {$skipped}, Failed: {$failed}");
        $this->info("Public URL: https://cdn.xorazm-tour.uz");

        return 0;
    }
}
