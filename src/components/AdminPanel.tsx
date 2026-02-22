import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Image as ImageIcon, Lock } from 'lucide-react';
import { uploadImage } from '@/config/cloudinary';

interface ArtworkFormData {
  title: string;
  description: string;
  category: string;
}

const categories = [
  'Landscape',
  'Portrait',
  'Animals',
  'Fantasy',
  'Abstract',
  'Nature',
  'Other',
];

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: '',
    description: '',
    category: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    if (password === 'artist123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !formData.title || !formData.category) {
      alert('Please fill in all required fields and select an image');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const imageUrl = await uploadImage(selectedFile);
      
      console.log('Upload successful:', {
        ...formData,
        imageUrl,
        createdAt: new Date(),
      });

      setUploadStatus('success');
      
      setFormData({ title: '', description: '', category: '' });
      clearFile();
      
      setTimeout(() => {
        setIsOpen(false);
        setUploadStatus('idle');
      }, 1500);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setIsAuthenticated(false);
    setPassword('');
    setFormData({ title: '', description: '', category: '' });
    clearFile();
    setUploadStatus('idle');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#A8E4A0] text-gray-900 shadow-md hover:shadow-lg transition-all hover:scale-105 z-40 flex items-center justify-center">
          <Lock className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-2 border-[#A8E4A0]/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-gray-900">
            {isAuthenticated ? 'Upload New Artwork' : 'Admin Login'}
          </DialogTitle>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="space-y-4 py-4">
            <p className="text-gray-500 text-sm">
              Please enter the admin password to continue
            </p>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8E4A0]" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="pl-10 border-[#A8E4A0]/20 focus:border-[#A8E4A0] focus:ring-[#A8E4A0]/20"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-[#A8E4A0] text-gray-900 hover:bg-[#8BC985] font-medium"
            >
              Login
            </Button>
            <p className="text-xs text-gray-400 text-center">
              Default password: artist123
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Artwork Image <span className="text-[#A8E4A0]">*</span>
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!previewUrl ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-[#A8E4A0]/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#A8E4A0] hover:bg-[#A8E4A0]/5 transition-colors"
                >
                  <ImageIcon className="w-8 h-8 text-[#A8E4A0]" />
                  <span className="text-gray-500 text-sm">Click to select image</span>
                  <span className="text-xs text-gray-400">JPG, PNG supported, max 5MB</span>
                </button>
              ) : (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border border-[#A8E4A0]/20"
                  />
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-[#A8E4A0]/10 border border-[#A8E4A0]/20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1 block">
                Artwork Title <span className="text-[#A8E4A0]">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your artwork a name"
                maxLength={50}
                className="border-[#A8E4A0]/20 focus:border-[#A8E4A0] focus:ring-[#A8E4A0]/20"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">
                Category <span className="text-[#A8E4A0]">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="border-[#A8E4A0]/20 focus:border-[#A8E4A0] focus:ring-[#A8E4A0]/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 block">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about this piece..."
                maxLength={300}
                className="min-h-[80px] resize-none border-[#A8E4A0]/20 focus:border-[#A8E4A0] focus:ring-[#A8E4A0]/20"
              />
              <p className="text-xs text-gray-400 text-right mt-1">
                {formData.description.length}/300
              </p>
            </div>

            <Button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#A8E4A0] text-gray-900 font-medium hover:bg-[#8BC985]"
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Artwork
                </span>
              )}
            </Button>

            {uploadStatus === 'success' && (
              <p className="text-center text-[#8BC985] text-sm">
                ✓ Upload successful!
              </p>
            )}
            {uploadStatus === 'error' && (
              <p className="text-center text-red-500 text-sm">
                ✗ Upload failed, please try again
              </p>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
