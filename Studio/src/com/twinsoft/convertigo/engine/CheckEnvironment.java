package com.twinsoft.convertigo.engine;

import java.io.BufferedReader;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collection;
import java.util.List;
import java.util.Properties;
import java.util.regex.Pattern;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.twinsoft.convertigo.engine.util.FileUtils;
import com.twinsoft.convertigo.engine.util.ZipUtils;

public class CheckEnvironment {

	public static void main(String[] args) {
		Properties log4jProperties = new Properties();
		log4jProperties.put("log4j.rootLogger", "INFO, stdout");
		log4jProperties.put("log4j.appender.stdout", "org.apache.log4j.ConsoleAppender");
		log4jProperties.put("log4j.appender.stdout.Target", "System.out");
		log4jProperties.put("log4j.appender.stdout.layout", "org.apache.log4j.PatternLayout");
		log4jProperties.put("log4j.appender.stdout.layout.ConversionPattern", "%-5p %d   %m%n");

		LogManager.resetConfiguration();
		PropertyConfigurator.configure(log4jProperties);
		Engine.logEngine = Logger.getLogger(CheckEnvironment.class);

		Engine.WEBAPP_PATH = "/devplatform/tomcat-qualif/webapps/convertigo/";

		run();
	}

	private static final String TEST_SUCCESS = "OK\n";
	private static final String TEST_WARN = "WARN\n";
	private static final String TEST_FAILED = "FAILED\n";

	protected static void run() {
		Engine.logEngine.info("----------------------------------------------------------------------");

		String testsSummary = "";
		try {
			Engine.logEngine.info("Checking native dependencies...");

			String os = System.getProperty("os.name");
			Engine.logEngine.info("Detected OS: " + os);

			boolean isLinux = os.startsWith("Linux");
			// boolean isWindows = os.startsWith("Windows");
			boolean isMacOS = os.startsWith("Mac OS X");

			String javaHome = System.getProperty("java.home");
			Engine.logEngine.info("Java home: " + javaHome);

			String javaLibraryPath = System.getProperty("java.library.path");
			Engine.logEngine.info("Java library path: " + javaLibraryPath);

			String workingDir = System.getProperty("user.dir");
			Engine.logEngine.info("Java working dir: " + workingDir);

			// Checking running user
			testsSummary += " - Test running user .......................... ";

			String userName = System.getProperty("user.name");
			Engine.logEngine.info("Java running user: " + userName);

			if (isLinux || isMacOS) {
				try {
					// Checking user returned by the command 'whoami'
					Process process = Runtime.getRuntime().exec("whoami");
					InputStreamReader isrStdout = new InputStreamReader(process.getInputStream());
					BufferedReader stdout = new BufferedReader(isrStdout);
					String whoami = stdout.readLine();
					Engine.logEngine.info("Whoami running user: " + whoami);

					if (!userName.equals(whoami)) {
						Engine.logEngine.warn("Java user name is different than 'whoami' user name!");
						testsSummary += TEST_WARN;
					} else {
						testsSummary += TEST_SUCCESS;
					}
				} catch (IOException e) {
					Engine.logEngine.error("Unable to retrieve the running user with 'whoami': "
							+ e.getMessage());
					testsSummary += TEST_WARN;
				}
			}

			// Checking user home
			testsSummary += " - Test user home directory ................... ";
			String userHome = System.getProperty("user.home");
			Engine.logEngine.info("User home: " + userHome);

			if (isLinux || isMacOS) {
				String sysEnvHome = System.getenv("HOME");
				Engine.logEngine.info("System env HOME: " + sysEnvHome);

				if (!userHome.equals(sysEnvHome)) {
					Engine.logEngine.warn("Java home is different than the system environment HOME!");
					testsSummary += TEST_WARN;
				} else {
					if (!isMacOS) {
						// Checking /etc/passwd file under linux
						try {
							File etcPasswdFile = new File("/etc/passwd");
							List<String> lines = FileUtils.readLines(etcPasswdFile);
	
							String etcPasswdUserHome = null;
							for (String line : lines) {
								if (line.startsWith(userName)) {
									String[] parts = line.split(":");
									int len = parts.length;
									if (len > 2) {
										etcPasswdUserHome = parts[parts.length - 2];
										break;
									}
								}
							}
	
							if (etcPasswdUserHome == null) {
								Engine.logEngine.warn("Unable to find the user home in /etc/passwd");
								testsSummary += TEST_WARN;
							} else {
								Engine.logEngine.info("/etc/passwd User home: " + userHome);
								if (!etcPasswdUserHome.equals(userHome)) {
									Engine.logEngine
											.error("The user home in /etc/passwd differs from the user home!");
									testsSummary += TEST_FAILED;
								} else {
									testsSummary += TEST_SUCCESS;
								}
							}
						} catch (IOException e) {
							Engine.logEngine.error("Unable to read the /etc/passwd file: " + e.getMessage());
							testsSummary += TEST_WARN;
						}
					} else {
						testsSummary += TEST_SUCCESS;
					}
				}
			} else {
				testsSummary += TEST_SUCCESS;
			}

			// Test write access in user home dir
			// The user dir must be writeable in order eclipse to write its
			// working files such as .eclipse...
			testsSummary += " - Test user home directory write access ...... ";
			try {
				CheckEnvironment.testWriteAccess(new File(userHome), true);
				testsSummary += TEST_SUCCESS;
			} catch (IOException e) {
				Engine.logEngine.error("The user home directory is not writeable!");
				testsSummary += TEST_FAILED;
			}

			// Check JBoss tmp dir
			String jbossTmpDir = System.getProperty("jboss.server.temp.dir");
			if (jbossTmpDir != null) {
				testsSummary += " - JBoss tmp directory write access .............. ";

				Engine.logEngine.info("JBoss detected");

				// Test write access in jboss tmp dir
				try {
					CheckEnvironment.testWriteAccess(new File(jbossTmpDir), true);
					testsSummary += TEST_SUCCESS;
				} catch (IOException e) {
					Engine.logEngine.error("The JBoss tmp directory is not writeable!");
					testsSummary += TEST_FAILED;
				}
			}

			// Check Tomcat tmp dir
			String tomcatTmpDir = System.getenv("CATALINA_TMPDIR");
			if (tomcatTmpDir != null) {
				testsSummary += " - Tomcat tmp directory write access ............. ";

				Engine.logEngine.info("Tomcat detected");

				// Test write access in tomcat tmp dir
				try {
					CheckEnvironment.testWriteAccess(new File(jbossTmpDir), true);
					testsSummary += TEST_SUCCESS;
				} catch (IOException e) {
					Engine.logEngine.error("The Tomcat tmp directory is not writeable!");
					testsSummary += TEST_FAILED;
				}
			}

			// TODO: test websphere tmp dir

			// System tmp dir
			testsSummary += " - System tmp directory write access .......... ";

			String sysTempDir = System.getProperty("java.io.tmpdir");
			Engine.logEngine.info("System tmp dir: " + sysTempDir);

			// Test write access in system tmp dir
			File testTmpDir = null;
			try {
				testTmpDir = CheckEnvironment.testWriteAccess(new File(sysTempDir), true);
				testsSummary += TEST_SUCCESS;
			} catch (IOException e) {
				Engine.logEngine.error("The system tmp directory is not writeable!");
				testsSummary += TEST_FAILED;
				return;
			}

			// Checking DISPLAY
			if (isLinux) {
				testsSummary += " - Test DISPLAY ............................... ";
				String display = System.getenv("DISPLAY");
				Engine.logEngine.info("DISPLAY: " + display);
				
				if (display == null) {
					Engine.logEngine.error("The DISPLAY environment variable is not set!");
					testsSummary += TEST_FAILED;
				} else {
					testsSummary += TEST_SUCCESS;
				}
			}

			// Check the XulRunner libraries dependencies
			testsSummary += " - XulRunner libraries dependencies ........... ";
			File xulrunnerLibDir = new File(Engine.WEBAPP_PATH + "/WEB-INF/xulrunner/");

			if (isLinux) {
				LddLibrariesResult lddLibrariesResult = lddLibraries(xulrunnerLibDir,
						xulrunnerLibDir.toString(), null);
				Engine.logEngine.info("Checking XulRunner libraries dependencies:\n"
						+ lddLibrariesResult.response);
				if (lddLibrariesResult.linkErrorFound) {
					Engine.logEngine.error("Missing some XulRunner libraries dependencies");
					testsSummary += TEST_FAILED;
				} else if (lddLibrariesResult.lddError) {
					testsSummary += TEST_FAILED;
				} else {
					testsSummary += TEST_SUCCESS;
				}
			} else {
				testsSummary += "IGNORED\n";
			}

			try {
				// SWT libraries dependencies
				testsSummary += " - SWT libraries dependencies ................. ";

				// TODO: remove next line (debugging purpose only)
				File convertigoLib = new File(Engine.WEBAPP_PATH + "/WEB-INF/lib/");

				String[] swtFoundJars = convertigoLib.list(new FilenameFilter() {
					public boolean accept(File dir, String name) {
						return name.startsWith("swt_") && name.endsWith(".jar");
					}
				});

				if (swtFoundJars == null || swtFoundJars.length == 0) {
					Engine.logEngine.error("Unable to find the SWT jar in " + convertigoLib.getPath());
					testsSummary += TEST_FAILED;
				} else {
					String swtJar = swtFoundJars[0];

					Engine.logEngine.debug("Found SWT jar: " + swtJar);

					File swtJarFile = new File(convertigoLib, swtJar);
					try {
						FileUtils.copyFileToDirectory(swtJarFile, testTmpDir);
					} catch (IOException e) {
						Engine.logEngine.error("Unable to copy the SWT jar: " + e.getMessage());
						testsSummary += TEST_FAILED;
					}

					try {
						// Unzip the SWT jar
						ZipUtils.expandZip(new File(testTmpDir, swtJar).toString(), testTmpDir.toString());
					} catch (Exception e) {
						Engine.logEngine.error("Unable to unzip the SWT jar: " + e.getMessage());
						testsSummary += TEST_FAILED;
					}

					// Check the SWT libraries dependencies
					if (isLinux) {
						LddLibrariesResult lddLibrariesResult = lddLibraries(testTmpDir,
								xulrunnerLibDir.toString() + ":" + javaLibraryPath + ":" + javaHome
										+ "/lib/i386/headless", ".*((gnome)|(glx)).*");
						Engine.logEngine.info("Checking SWT libraries dependencies:\n"
								+ lddLibrariesResult.response);
						if (lddLibrariesResult.linkErrorFound) {
							Engine.logEngine.error("Missing some SWT libraries dependencies");
							testsSummary += TEST_FAILED;
						} else if (lddLibrariesResult.lddError) {
							testsSummary += TEST_FAILED;
						} else {
							testsSummary += TEST_SUCCESS;
						}
					} else {
						testsSummary += "IGNORED\n";
					}
				}
			} finally {
				testTmpDir.delete();
			}

			if (testsSummary.indexOf("FAILED") == -1 && testsSummary.indexOf("WARN") == -1) {
				testsSummary += "Bravo! All tests passed :o)";
			}
		} catch (Exception e) {
			Engine.logEngine.error("Error while checking environment", e);
		} finally {
			Engine.logEngine.info("*** ENVIRONMENT TESTS SUMMARY ***\n" + testsSummary);
			Engine.logEngine.info("----------------------------------------------------------------------");
		}
	}

	private static class LddLibrariesResult {
		public String response = "";
		public boolean linkErrorFound = false;
		public boolean lddError = false;
	}

	private static LddLibrariesResult lddLibraries(File libDir, String lddLibraryPath, String excludePattern) {
		Engine.logEngine.debug("Launching ldd in " + libDir.toString());

		Collection<File> libs = FileUtils.listFiles(libDir, new String[] { "so" }, false);

		LddLibrariesResult lddLibrariesResult = new LddLibrariesResult();

		for (File lib : libs) {
			String libName = lib.getName();
			lddLibrariesResult.response += "   " + libName;

			if (excludePattern != null && Pattern.matches(excludePattern, libName)) {
				lddLibrariesResult.response += "   *** ignored (library not needed) ***\n";
			} else {
				lddLibrariesResult.response += "\n";
				try {
					Process process = Runtime.getRuntime().exec("ldd " + lib,
							new String[] { "LD_LIBRARY_PATH=" + lddLibraryPath });

					InputStreamReader isrStdout = new InputStreamReader(process.getInputStream());
					BufferedReader stdout = new BufferedReader(isrStdout);
					String line;
					while ((line = stdout.readLine()) != null) {
						if (line.indexOf("not found") != -1) {
							lddLibrariesResult.response += line + "\n";
							lddLibrariesResult.linkErrorFound = true;
						}
					}

					process.waitFor();

					int lddExitValue = process.exitValue();
					Engine.logEngine.debug("ldd returned with exit value: " + lddExitValue);

					if (lddExitValue != 0) {
						Engine.logEngine.warn("ldd returned non zero value (" + lddExitValue + ")");
						lddLibrariesResult.lddError = true;
					}
				} catch (IOException e) {
					Engine.logEngine.warn("Unable to execute ldd for the native library: " + e.getMessage());
					lddLibrariesResult.lddError = true;
				} catch (InterruptedException e) {
					Engine.logEngine.warn("InterruptedException in ldd");
					lddLibrariesResult.lddError = true;
				}
			}
		}

		return lddLibrariesResult;
	}

	private static File testWriteAccess(File dir, boolean deleteTmpDirOnExit) throws IOException {
		String c8oTmpDirName = "convertigo-" + (int) (Math.random() * 1000000000) + ".tmp";
		File tmpDirFile = new File(dir, c8oTmpDirName);

		try {
			if (tmpDirFile.exists()) {
				FileUtils.deleteQuietly(tmpDirFile);
			}

			tmpDirFile.mkdir();

			if (!tmpDirFile.exists()) {
				throw new IOException("The directory '" + dir.getPath() + "' is not writeable!");
			}

			return tmpDirFile;
		} finally {
			if (deleteTmpDirOnExit) {
				tmpDirFile.delete();
			}
		}
	}
}
