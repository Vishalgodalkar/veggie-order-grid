
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { User, Shield } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Customer</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Customer Login</CardTitle>
                <CardDescription>
                  Access your dashboard and browse prompts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input id="customer-email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input id="customer-password" type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
                <div className="text-center space-y-2">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <CardDescription>
                  Access administrative dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" placeholder="Enter admin email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input id="admin-password" type="password" placeholder="Enter admin password" />
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Admin Sign In
                </Button>
                <div className="text-center">
                  <Link to="/admin/forgot-password" className="text-sm text-gray-600 hover:underline">
                    Forgot admin password?
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
